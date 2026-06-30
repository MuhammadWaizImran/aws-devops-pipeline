#!/bin/bash
set -euo pipefail

echo ">>> Installing Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

echo ">>> Installing PM2 process manager..."
sudo npm install -g pm2

echo ">>> Node version: $(node --version)"
echo ">>> NPM version: $(npm --version)"
echo ">>> Node.js + PM2 install complete."
