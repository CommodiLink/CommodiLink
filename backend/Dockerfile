FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npx prisma generate && npx esbuild src/index.js --bundle --platform=node --target=node18 --outfile=dist/index.js
EXPOSE 4000
CMD ['node','dist/index.js']
