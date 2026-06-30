variable "project_name" { type = string }
variable "vpc_id" { type = string }
variable "public_subnet_ids" { type = list(string) }
variable "ec2_security_group_id" { type = string }
variable "target_group_arn" { type = string }
variable "instance_type" { type = string; default = "t3.small" }
variable "asg_min_size" { type = number; default = 1 }
variable "asg_max_size" { type = number; default = 4 }
variable "asg_desired_capacity" { type = number; default = 2 }
variable "kms_key_arn" { type = string }
variable "s3_bucket_arn" { type = string }
variable "tags" { type = map(string); default = {} }
