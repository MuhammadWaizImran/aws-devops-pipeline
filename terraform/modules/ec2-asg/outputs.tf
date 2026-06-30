output "asg_name" { value = aws_autoscaling_group.app.name }
output "asg_arn" { value = aws_autoscaling_group.app.arn }
output "scale_out_policy_arn" { value = aws_autoscaling_policy.scale_out.arn }
output "scale_in_policy_arn" { value = aws_autoscaling_policy.scale_in.arn }
