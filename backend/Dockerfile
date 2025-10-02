FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the app
COPY . .

# Expose the port your app uses
EXPOSE 4000

# Start the API from source (no esbuild needed)
CMD ["node", "src/index.js"]
