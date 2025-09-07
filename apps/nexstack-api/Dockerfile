# Multi-stage build for production optimization
FROM node:18-alpine AS base
RUN npm install -g pnpm turbo
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY turbo.json ./
COPY apps/nexstack-api/package.json ./apps/nexstack-api/
COPY packages/*/package.json ./packages/*/
RUN pnpm install --frozen-lockfile

# Build the application
FROM base AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm build --filter=nexstack-api...

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/apps/nexstack-api/dist ./
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json

USER nodejs

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js || exit 1

CMD ["node", "index.js"]