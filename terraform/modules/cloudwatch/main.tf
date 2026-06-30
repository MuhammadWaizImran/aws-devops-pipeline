resource "aws_cloudwatch_log_group" "app" {
  name              = "/aws/${var.project_name}/app"
  retention_in_days = 30
  kms_key_id        = var.kms_key_arn
  tags              = var.tags
}

resource "aws_cloudwatch_metric_alarm" "cpu_high" {
  alarm_name          = "${var.project_name}-cpu-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 120
  statistic           = "Average"
  threshold           = 70
  alarm_description   = "Trigger scale-out when CPU > 70% for 4 minutes"
  alarm_actions       = [var.scale_out_policy_arn]

  dimensions = { AutoScalingGroupName = var.asg_name }

  tags = var.tags
}

resource "aws_cloudwatch_metric_alarm" "cpu_low" {
  alarm_name          = "${var.project_name}-cpu-low"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 300
  statistic           = "Average"
  threshold           = 20
  alarm_description   = "Trigger scale-in when CPU < 20% for 10 minutes"
  alarm_actions       = [var.scale_in_policy_arn]

  dimensions = { AutoScalingGroupName = var.asg_name }

  tags = var.tags
}

resource "aws_cloudwatch_metric_alarm" "alb_5xx" {
  alarm_name          = "${var.project_name}-alb-5xx-errors"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "HTTPCode_Target_5XX_Count"
  namespace           = "AWS/ApplicationELB"
  period              = 60
  statistic           = "Sum"
  threshold           = 10
  alarm_description   = "Alert when 5xx errors exceed 10 in 1 minute"
  treat_missing_data  = "notBreaching"

  dimensions = { LoadBalancer = var.alb_arn_suffix }

  tags = var.tags
}

resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = "${var.project_name}-dashboard"
  dashboard_body = jsonencode({
    widgets = [
      {
        type       = "metric"
        x          = 0; y = 0; width = 12; height = 6
        properties = {
          title   = "EC2 CPU Utilization"
          metrics = [["AWS/EC2", "CPUUtilization", "AutoScalingGroupName", var.asg_name]]
          period  = 60; stat = "Average"; region = var.aws_region
        }
      },
      {
        type       = "metric"
        x          = 12; y = 0; width = 12; height = 6
        properties = {
          title   = "ALB Request Count"
          metrics = [["AWS/ApplicationELB", "RequestCount", "LoadBalancer", var.alb_arn_suffix]]
          period  = 60; stat = "Sum"; region = var.aws_region
        }
      }
    ]
  })
}
