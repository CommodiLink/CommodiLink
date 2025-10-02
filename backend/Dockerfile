# --- base with openssl for Prisma ---
FROM node:18-alpine

# OS deps
RUN apk add --no-cache openssl

# App workspace
WORKDIR /app

# Install JS deps (keep NODE_ENV unset so devDeps install)
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest
COPY . .

# Port
ENV PORT=4000
EXPOSE 4000

# Start-up sequence (works on free tier):
# 1) generate client  2) push schema  3) start API
CMD ["sh","-c","npx prisma generate && npx prisma db push --accept-data-loss && node src/index.js"]
