#!/bin/bash
set -euo pipefail

echo ">>> Installing pre-built Next.js application..."
sudo mkdir -p /opt/app/.next/standalone/.next/static
sudo mkdir -p /opt/app/.next/standalone/public

sudo cp -r /tmp/standalone/. /opt/app/.next/standalone/
sudo cp -r /tmp/static/. /opt/app/.next/standalone/.next/static/

if [ -d /tmp/public ] && [ -n "$(ls -A /tmp/public 2>/dev/null)" ]; then
  sudo cp -r /tmp/public/. /opt/app/.next/standalone/public/
fi

sudo chown -R ubuntu:ubuntu /opt/app
echo ">>> App installed at /opt/app/.next/standalone"
