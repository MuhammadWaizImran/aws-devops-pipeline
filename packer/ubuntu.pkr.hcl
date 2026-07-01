packer {
  required_plugins {
    amazon = {
      version = ">= 1.3.0"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "app_version" {
  type    = string
  default = "latest"
}

variable "instance_type" {
  type    = string
  default = "t3.small"
}

locals {
  timestamp = regex_replace(timestamp(), "[: TZ]", "-")
  ami_name  = "aws-devops-app-${var.app_version}-${local.timestamp}"
}

source "amazon-ebs" "ubuntu" {
  region        = var.aws_region
  instance_type = var.instance_type
  ami_name      = local.ami_name
  ami_description = "AWS DevOps App AMI - Next.js + Nginx - ${local.timestamp}"

  source_ami_filter {
    filters = {
      name                = "ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["099720109477"]
  }

  ssh_username                = "ubuntu"
  ssh_timeout                 = "15m"
  associate_public_ip_address = true
  ssh_interface               = "public_ip"

  ami_block_device_mappings {
    device_name           = "/dev/sda1"
    volume_size           = 20
    volume_type           = "gp3"
    delete_on_termination = true
  }

  tags = {
    Name        = local.ami_name
    Environment = "production"
    Version     = var.app_version
    BuildDate   = local.timestamp
    ManagedBy   = "packer"
  }
}

build {
  name    = "aws-devops-app"
  sources = ["source.amazon-ebs.ubuntu"]

  provisioner "shell" {
    inline = [
      "mkdir -p /tmp/standalone",
      "mkdir -p /tmp/static",
      "mkdir -p /tmp/public"
    ]
  }

  provisioner "shell" {
    script = "scripts/01-system-setup.sh"
  }

  provisioner "shell" {
    script = "scripts/02-install-node.sh"
  }

  provisioner "file" {
    source      = "../app/.next/standalone/"
    destination = "/tmp/standalone/"
  }

  provisioner "file" {
    source      = "../app/.next/static/"
    destination = "/tmp/static/"
  }

  provisioner "file" {
    source      = "../app/public/"
    destination = "/tmp/public/"
  }

  provisioner "shell" {
    script = "scripts/03-setup-app.sh"
  }

  provisioner "shell" {
    script = "scripts/04-setup-nginx.sh"
  }

  provisioner "shell" {
    script = "scripts/05-setup-systemd.sh"
  }

  provisioner "shell" {
    inline = ["sudo rm -rf /tmp/standalone /tmp/static /tmp/public"]
  }
}
