# backend/Dockerfile
# Lightweight Node image
FROM node:18-alpine

# --- System packages Prisma needs on Alpine ---
# (openssl is required by Prisma query engine)
RUN apk add --no-cache openssl

# --- App workspace ---
WORKDIR /app

# --- Install JS dependencies first (cache-friendly layer) ---
# NOTE: Do NOT set NODE_ENV=production here, because Prisma CLI
# may be in devDependencies and is needed at runtime for generate/db push.
COPY package.json package-lock.json* ./
RUN npm install

# --- Copy the rest of the source code ---
COPY . .

# --- Port your server listens on ---
ENV PORT=4000
EXPOSE 4000

# --- Start-up sequence ---
# 1) Generate Prisma client
# 2) Push schema to DB (no migrations; good for free tier/prototyping)
# 3) Start your API
CMD ["sh", "-c", "npx prisma generate && npx prisma db push --accept-data-loss && node src/index.js"]

