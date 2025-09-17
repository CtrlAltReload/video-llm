#!/bin/bash
cd ~/video-llm

# Update repo
git fetch origin main
git reset --hard origin/main

# Go into API folder
cd apps/api

# Refresh env
echo "${PROD_ENV}" > .env

# Install dependencies
npm install

# Build
npm run build || echo "No build step"

# Restart with PM2
pm2 restart api || pm2 start dist/index.js --name api

pm2 save

sudo systemctl reload nginx
