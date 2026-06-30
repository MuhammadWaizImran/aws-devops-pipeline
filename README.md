# AWS DevOps Project

Full CI/CD pipeline deploying a Next.js app on AWS using GitHub Actions, HashiCorp Packer, and Terraform.

## Architecture

```
Developer → Git → GitHub → GitHub Actions (CI: test/lint) → (CD: Packer build AMI)
                                                                      ↓
Terraform manages: Route 53 → ACM → Internet Gateway → ALB → EC2 Auto Scaling Group
                                                               (public subnets, 2 AZs)
                                                                      ↓
                                              RDS PostgreSQL Multi-AZ (private subnets)
                                              KMS encryption | CloudWatch monitoring | S3 artifacts
```

## Project Structure

```
aws-devops-project/
├── app/                        # Next.js application
├── packer/                     # HashiCorp Packer AMI definition
│   ├── ubuntu.pkr.hcl
│   └── scripts/
├── terraform/
│   ├── bootstrap/              # One-time: creates S3 state bucket + DynamoDB lock
│   ├── github-oidc/            # One-time: creates IAM role for GitHub Actions OIDC
│   ├── modules/
│   │   ├── vpc/                # VPC, subnets, security groups, IGW, NAT
│   │   ├── kms/                # KMS key for encryption
│   │   ├── s3/                 # Artifact bucket
│   │   ├── acm/                # SSL/TLS certificate (DNS validated)
│   │   ├── alb/                # Application Load Balancer + target group
│   │   ├── ec2-asg/            # Launch template + Auto Scaling Group
│   │   ├── rds/                # PostgreSQL Multi-AZ + Secrets Manager
│   │   ├── cloudwatch/         # Alarms, dashboards, log groups
│   │   └── route53/            # DNS records + health check
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
└── .github/workflows/
    ├── ci.yml                  # Pull request: test, lint, terraform validate
    └── cd.yml                  # Push to main: Packer AMI → Terraform apply → ASG refresh
```

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| AWS CLI | v2 | https://aws.amazon.com/cli/ |
| Terraform | >= 1.9 | https://developer.hashicorp.com/terraform/install |
| Packer | >= 1.11 | https://developer.hashicorp.com/packer/install |
| Node.js | 20 LTS | https://nodejs.org |
| Git | any | https://git-scm.com |

You also need:
- An AWS account with admin access
- A **registered domain name** pointing to a Route 53 Hosted Zone
- A GitHub account

---

## Step-by-Step Setup

### Step 1 — AWS CLI Login

```bash
aws configure
# Enter: AWS Access Key ID, Secret Access Key, region (us-east-1), output (json)

# Verify
aws sts get-caller-identity
```

### Step 2 — Create GitHub Repository

```bash
# Push this project to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/aws-devops-project.git
git push -u origin main
```

### Step 3 — Bootstrap Terraform Backend

This creates the S3 bucket and DynamoDB table Terraform uses to store state.
Run this **once** before anything else.

```bash
cd terraform/bootstrap
terraform init
terraform apply
# Note the output: state_bucket_name
```

Then update `terraform/main.tf` backend block — replace `REPLACE-WITH-YOUR-ACCOUNT-ID` with your actual AWS account ID:
```hcl
backend "s3" {
  bucket = "tf-state-123456789012"   # your account ID
  ...
}
```

### Step 4 — Set Up GitHub Actions OIDC (No Secrets Needed)

This lets GitHub Actions authenticate to AWS using OIDC tokens instead of long-lived keys.

```bash
cd terraform/github-oidc
terraform init
terraform apply \
  -var="github_org=YOUR_GITHUB_USERNAME" \
  -var="github_repo=aws-devops-project"

# Copy the output role ARN
```

### Step 5 — Add GitHub Secrets

In your GitHub repo → Settings → Secrets and variables → Actions, add:

| Secret | Value |
|--------|-------|
| `AWS_ROLE_ARN` | ARN from Step 4 output |
| `TF_STATE_BUCKET` | Bucket name from Step 3 output |
| `DOMAIN_NAME` | Your domain (e.g. `example.com`) |

### Step 6 — Configure Your Domain

Make sure your domain has a **Hosted Zone in Route 53**:

```bash
# Check if zone exists
aws route53 list-hosted-zones-by-name --dns-name yourdomain.com

# If not, create it
aws route53 create-hosted-zone \
  --name yourdomain.com \
  --caller-reference $(date +%s)
```

Copy the 4 NS records from the hosted zone and add them to your domain registrar.

### Step 7 — Create terraform.tfvars

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars — set domain_name to your actual domain
```

### Step 8 — Deploy

The pipeline triggers automatically on every push to `main`.

To deploy manually for the first time:

```bash
# 1. Build the AMI with Packer
cd packer
packer init ubuntu.pkr.hcl
packer build -var="app_version=v1.0.0" ubuntu.pkr.hcl

# 2. Apply Terraform infrastructure
cd ../terraform
terraform init
terraform plan -var="domain_name=yourdomain.com"
terraform apply -var="domain_name=yourdomain.com"

# 3. Trigger instance refresh (deploys new AMI to ASG)
aws autoscaling start-instance-refresh \
  --auto-scaling-group-name aws-devops-app-asg \
  --strategy Rolling \
  --preferences '{"MinHealthyPercentage":50}'
```

---

## How the CI/CD Pipeline Works

### On Pull Request → `ci.yml`
1. Install Node.js deps → run `npm run lint` + `npm run test`
2. `terraform fmt -check` → `terraform validate`
3. Both must pass before merging

### On Push to `main` → `cd.yml`
1. **Packer** builds a new Ubuntu AMI with the app pre-installed (Node.js + Nginx + systemd)
2. **Terraform** applies any infrastructure changes
3. **ASG Instance Refresh** rolls out the new AMI to EC2 instances (50% min healthy, rolling)
4. Health check verifies `https://yourdomain.com/health` returns 200

---

## Infrastructure Details

| Component | Detail |
|-----------|--------|
| VPC | 10.0.0.0/16, 2 AZs |
| Public Subnets | EC2 instances (ASG min=1, max=4) |
| Private Subnets | RDS PostgreSQL 16 Multi-AZ |
| ALB | HTTPS only (HTTP redirects to HTTPS) |
| SSL | ACM certificate, DNS validated via Route 53 |
| AMI | Ubuntu 22.04, encrypted EBS (gp3 20GB) |
| Database | PostgreSQL 16.3, encrypted, credentials in Secrets Manager |
| Scaling | CPU > 70% for 4 min → scale out; CPU < 20% for 10 min → scale in |
| Encryption | KMS key used by RDS, EBS, S3, CloudWatch logs, Secrets Manager |

---

## Cost Estimate (us-east-1)

| Resource | ~Monthly Cost |
|----------|--------------|
| EC2 t3.small x2 | ~$30 |
| RDS db.t3.micro Multi-AZ | ~$30 |
| ALB | ~$20 |
| NAT Gateway | ~$35 |
| Route 53 | ~$1 |
| S3 + KMS + CloudWatch | ~$5 |
| **Total** | **~$120/month** |

> To reduce cost for learning/portfolio: set `asg_desired_capacity = 1`, use `db.t3.micro` with `multi_az = false`, and stop resources when not in use.

---

## Useful Commands

```bash
# Check ASG instances
aws autoscaling describe-auto-scaling-groups \
  --auto-scaling-group-names aws-devops-app-asg

# Watch CloudWatch logs
aws logs tail /aws/aws-devops-app/app --follow

# SSH to EC2 via SSM (no key pair needed)
aws ssm start-session --target INSTANCE_ID

# Destroy everything (careful!)
cd terraform && terraform destroy -var="domain_name=yourdomain.com"
```
