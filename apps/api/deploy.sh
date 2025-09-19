#!/bin/bash
set -e

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
# Repo root is two levels up from apps/api
REPO_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"

cd "$REPO_ROOT"

# Update repo
git fetch origin main
git reset --hard origin/main

# Go into API folder
cd apps/api

# Install dependencies
npm install --production

# Build
npm run build || echo "No build step"

# Restart with PM2
pm2 restart api || pm2 start dist/index.js --name api

# Save PM2 process list
pm2 save

# Reload Nginx
sudo systemctl reload nginx || true
