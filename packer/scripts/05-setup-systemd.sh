#!/bin/bash
set -euo pipefail

echo ">>> Setting up systemd service for Next.js app..."

sudo tee /etc/systemd/system/nextjs-app.service > /dev/null <<'EOF'
[Unit]
Description=Next.js Application
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/opt/app/.next/standalone
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT=3000
StandardOutput=journal
StandardError=journal
SyslogIdentifier=nextjs-app

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable nextjs-app
sudo systemctl enable nginx

echo ">>> Systemd service setup complete."
