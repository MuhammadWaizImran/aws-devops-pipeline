terraform {
  required_version = ">= 1.9.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    bucket         = "tf-state-288720721698"
    key            = "aws-devops-project/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "tf-state-lock"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = local.common_tags
  }
}

data "aws_caller_identity" "current" {}

locals {
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

module "kms" {
  source       = "./modules/kms"
  project_name = var.project_name
  tags         = local.common_tags
}

module "vpc" {
  source               = "./modules/vpc"
  project_name         = var.project_name
  vpc_cidr             = var.vpc_cidr
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  availability_zones   = var.availability_zones
  tags                 = local.common_tags
}

module "s3" {
  source       = "./modules/s3"
  project_name = var.project_name
  account_id   = data.aws_caller_identity.current.account_id
  kms_key_arn  = module.kms.key_arn
  tags         = local.common_tags
}

module "alb" {
  source                = "./modules/alb"
  project_name          = var.project_name
  vpc_id                = module.vpc.vpc_id
  public_subnet_ids     = module.vpc.public_subnet_ids
  alb_security_group_id = module.vpc.alb_security_group_id
  tags                  = local.common_tags
}

module "rds" {
  source                = "./modules/rds"
  project_name          = var.project_name
  private_subnet_ids    = module.vpc.private_subnet_ids
  rds_security_group_id = module.vpc.rds_security_group_id
  kms_key_arn           = module.kms.key_arn
  db_name               = var.db_name
  db_username           = var.db_username
  db_instance_class     = var.db_instance_class
  tags                  = local.common_tags
}

module "ec2_asg" {
  source                = "./modules/ec2-asg"
  project_name          = var.project_name
  vpc_id                = module.vpc.vpc_id
  public_subnet_ids     = module.vpc.public_subnet_ids
  ec2_security_group_id = module.vpc.ec2_security_group_id
  target_group_arn      = module.alb.target_group_arn
  ami_id                = var.ami_id
  instance_type         = var.instance_type
  asg_min_size          = var.asg_min_size
  asg_max_size          = var.asg_max_size
  asg_desired_capacity  = var.asg_desired_capacity
  kms_key_arn           = module.kms.key_arn
  s3_bucket_arn         = module.s3.bucket_arn
  tags                  = local.common_tags
}

module "cloudwatch" {
  source               = "./modules/cloudwatch"
  project_name         = var.project_name
  aws_region           = var.aws_region
  asg_name             = module.ec2_asg.asg_name
  alb_arn_suffix       = module.alb.alb_arn_suffix
  scale_out_policy_arn = module.ec2_asg.scale_out_policy_arn
  scale_in_policy_arn  = module.ec2_asg.scale_in_policy_arn
  kms_key_arn          = module.kms.key_arn
  tags                 = local.common_tags
}
