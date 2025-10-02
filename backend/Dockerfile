# /backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install deps
COPY package.json package-lock.json* ./
RUN npm install

# Copy code
COPY . .

# Generate Prisma client (no DB needed for this step)
RUN npx prisma generate

# App port
EXPOSE 4000

# Start server directly from source
CMD ["node", "src/index.js"]
