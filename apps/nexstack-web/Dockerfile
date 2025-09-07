# Multi-stage build for Next.js production
FROM node:18-alpine AS base
RUN npm install -g pnpm turbo
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY turbo.json ./
COPY apps/nexstack-web/package.json ./apps/nexstack-web/
COPY packages/*/package.json ./packages/*/
RUN pnpm install --frozen-lockfile

# Build the application
FROM base AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm build --filter=nexstack-web...

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/apps/nexstack-web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/nexstack-web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/nexstack-web/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]