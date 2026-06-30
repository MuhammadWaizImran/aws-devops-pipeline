variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "github_org" {
  type        = string
  description = "Your GitHub username or organization (e.g. MuhammadWaizImran)"
}

variable "github_repo" {
  type        = string
  description = "Your GitHub repository name (e.g. aws-devops-project)"
}
