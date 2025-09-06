# Base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy root package.json and lockfile
COPY package.json pnpm-lock.yaml ./

# Copy turbo.json
COPY turbo.json turbo.json

# Install all dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source code for all packages and apps
COPY . .

# Build the api-server
RUN pnpm turbo build --filter=api-server

# Set the command to run the api-server
CMD ["pnpm", "--filter=api-server", "start"]