#!/bin/bash
set -e

# Fetch DB password from Secrets Manager
DB_PASSWORD=$(aws secretsmanager get-secret-value \
  --secret-id "${db_secret_arn}" \
  --region us-east-1 \
  --query SecretString \
  --output text)

# Write environment file
cat > /etc/nextjs-app.env <<EOF
DATABASE_URL=postgresql://${db_username}:$${DB_PASSWORD}@${db_endpoint}:${db_port}/${db_name}
NODE_ENV=production
PORT=3000
EOF

chmod 600 /etc/nextjs-app.env

systemctl start nextjs-app
systemctl start nginx
