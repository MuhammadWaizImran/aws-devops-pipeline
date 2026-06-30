#!/bin/bash
set -euo pipefail

echo ">>> Building Next.js application..."
sudo mkdir -p /opt/app
sudo cp -r /tmp/app/. /opt/app/
sudo chown -R ubuntu:ubuntu /opt/app

cd /opt/app
npm ci --production=false
npm run build

echo ">>> App build complete. Standalone output at /opt/app/.next/standalone"
