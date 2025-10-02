FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy rest of the code
COPY . .

# Generate Prisma client and build app
RUN npx prisma generate && npx esbuild src/index.js --bundle --platform=node --target=node18 --outfile=dist/index.js

# Expose app port
EXPOSE 4000

# Start the app
CMD ["node", "dist/index.js"]
