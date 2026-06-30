output "app_url" {
  value       = "http://${module.alb.alb_dns_name}"
  description = "Application URL — open this in your browser"
}

output "alb_dns_name" {
  value       = module.alb.alb_dns_name
  description = "ALB DNS name"
}

output "rds_endpoint" {
  value       = module.rds.db_endpoint
  description = "RDS database endpoint (private)"
  sensitive   = true
}

output "db_secret_arn" {
  value       = module.rds.db_secret_arn
  description = "Secrets Manager ARN for DB credentials"
}

output "s3_bucket" {
  value       = module.s3.bucket_name
  description = "S3 bucket for artifacts"
}
