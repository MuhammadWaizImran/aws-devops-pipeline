terraform {
  required_version = ">= 1.9.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

data "aws_caller_identity" "current" {}

resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = ["sts.amazonaws.com"]

  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1",
    "1c58a3a8518e8759bf075b76b750d4f2df264fcd"
  ]
}

data "aws_iam_policy_document" "github_assume_role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_org}/${var.github_repo}:*"]
    }
  }
}

resource "aws_iam_role" "github_actions" {
  name               = "github-actions-${var.github_repo}"
  assume_role_policy = data.aws_iam_policy_document.github_assume_role.json

  tags = {
    ManagedBy  = "terraform"
    Repository = "${var.github_org}/${var.github_repo}"
  }
}

resource "aws_iam_role_policy" "github_actions_permissions" {
  name = "github-actions-permissions"
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "EC2AndASG"
        Effect = "Allow"
        Action = [
          "ec2:*",
          "autoscaling:*",
          "elasticloadbalancing:*"
        ]
        Resource = "*"
      },
      {
        Sid    = "TerraformState"
        Effect = "Allow"
        Action = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject", "s3:ListBucket"]
        Resource = [
          "arn:aws:s3:::tf-state-${data.aws_caller_identity.current.account_id}",
          "arn:aws:s3:::tf-state-${data.aws_caller_identity.current.account_id}/*"
        ]
      },
      {
        Sid      = "TerraformStateLock"
        Effect   = "Allow"
        Action   = ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:DeleteItem"]
        Resource = "arn:aws:dynamodb:${var.aws_region}:${data.aws_caller_identity.current.account_id}:table/tf-state-lock"
      },
      {
        Sid    = "PackerAMI"
        Effect = "Allow"
        Action = [
          "ec2:DescribeImages", "ec2:DescribeInstances", "ec2:DescribeVolumes",
          "ec2:DescribeSnapshots", "ec2:CreateImage", "ec2:DeregisterImage",
          "ec2:DeleteSnapshot", "ec2:CreateTags", "ec2:RunInstances",
          "ec2:TerminateInstances", "ec2:StopInstances", "ec2:CreateKeyPair",
          "ec2:DeleteKeyPair", "ec2:CreateSecurityGroup", "ec2:DeleteSecurityGroup",
          "ec2:AuthorizeSecurityGroupIngress", "ec2:RevokeSecurityGroupIngress"
        ]
        Resource = "*"
      },
      {
        Sid    = "IAMForEC2"
        Effect = "Allow"
        Action = [
          "iam:CreateRole", "iam:DeleteRole", "iam:AttachRolePolicy",
          "iam:DetachRolePolicy", "iam:PutRolePolicy", "iam:DeleteRolePolicy",
          "iam:CreateInstanceProfile", "iam:DeleteInstanceProfile",
          "iam:AddRoleToInstanceProfile", "iam:RemoveRoleFromInstanceProfile",
          "iam:PassRole", "iam:GetRole", "iam:GetInstanceProfile",
          "iam:ListRolePolicies", "iam:ListAttachedRolePolicies"
        ]
        Resource = "*"
      },
      {
        Sid    = "OtherServices"
        Effect = "Allow"
        Action = [
          "rds:*", "kms:*", "secretsmanager:*",
          "route53:*", "acm:*", "cloudwatch:*",
          "logs:*", "s3:*"
        ]
        Resource = "*"
      }
    ]
  })
}

output "role_arn" {
  value       = aws_iam_role.github_actions.arn
  description = "Add this as AWS_ROLE_ARN secret in GitHub repository settings"
}
