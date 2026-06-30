variable "project_name" { type = string }
variable "aws_region" { type = string }
variable "asg_name" { type = string }
variable "alb_arn_suffix" { type = string }
variable "scale_out_policy_arn" { type = string }
variable "scale_in_policy_arn" { type = string }
variable "kms_key_arn" { type = string }
variable "tags" { type = map(string); default = {} }
