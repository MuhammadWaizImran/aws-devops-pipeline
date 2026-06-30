output "key_id" { value = aws_kms_key.main.id }
output "key_arn" { value = aws_kms_key.main.arn }
output "alias_arn" { value = aws_kms_alias.main.arn }
