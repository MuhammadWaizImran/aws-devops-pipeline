#!/bin/bash
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive

echo ">>> Installing Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo -E apt-get install -y nodejs

echo ">>> Node version: $(node --version)"
echo ">>> NPM version: $(npm --version)"
echo ">>> Node.js install complete."
