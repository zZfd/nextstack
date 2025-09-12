# Multi-stage build for Vite nexstack-admin
FROM node:18-alpine AS base
RUN npm install -g pnpm turbo
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY turbo.json ./
COPY apps/nexstack-admin/package.json ./apps/nexstack-admin/
COPY packages/*/package.json ./packages/*/
RUN pnpm install --frozen-lockfile

# Build the application
FROM base AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm build --filter=nexstack-admin...

# Production runtime with nginx
FROM nginx:alpine AS runner

# Copy built static files
COPY --from=builder /app/apps/nexstack-admin/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html index.htm;

    # Handle client-side routing
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    # Gzip compression
    gzip on;
    gzip_types
        text/plain
        text/css
        text/js
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
}
EOF

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]