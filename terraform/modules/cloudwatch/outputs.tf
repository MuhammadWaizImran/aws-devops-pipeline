output "log_group_name" { value = aws_cloudwatch_log_group.app.name }
output "cpu_high_alarm_arn" { value = aws_cloudwatch_metric_alarm.cpu_high.arn }
