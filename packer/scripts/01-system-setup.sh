#!/bin/bash
set -euo pipefail

echo ">>> Updating system packages..."
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install -y \
  curl \
  wget \
  unzip \
  git \
  build-essential \
  ca-certificates \
  gnupg \
  lsb-release

echo ">>> System setup complete."
