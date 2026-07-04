#!/bin/bash
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive

echo ">>> Updating system packages..."
echo 'Acquire::AllowWeakRepositories "true";' | sudo tee /etc/apt/apt.conf.d/99weak-repos
sudo -E apt-get update -y || sudo -E apt-get update -y
sudo -E apt-get upgrade -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold"
sudo -E apt-get install -y \
  curl \
  wget \
  unzip \
  git \
  ca-certificates \
  gnupg \
  lsb-release

echo ">>> System setup complete."
