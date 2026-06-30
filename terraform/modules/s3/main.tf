resource "aws_s3_bucket" "app_artifacts" {
  bucket        = "${var.project_name}-artifacts-${var.account_id}"
  force_destroy = false

  tags = merge(var.tags, { Name = "${var.project_name}-artifacts" })
}

resource "aws_s3_bucket_versioning" "app_artifacts" {
  bucket = aws_s3_bucket.app_artifacts.id
  versioning_configuration { status = "Enabled" }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "app_artifacts" {
  bucket = aws_s3_bucket.app_artifacts.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = var.kms_key_arn
    }
    bucket_key_enabled = true
  }
}

resource "aws_s3_bucket_public_access_block" "app_artifacts" {
  bucket                  = aws_s3_bucket.app_artifacts.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_lifecycle_configuration" "app_artifacts" {
  bucket = aws_s3_bucket.app_artifacts.id

  rule {
    id     = "expire-old-builds"
    status = "Enabled"

    filter { prefix = "builds/" }

    noncurrent_version_expiration { noncurrent_days = 30 }
    expiration { days = 90 }
  }
}
