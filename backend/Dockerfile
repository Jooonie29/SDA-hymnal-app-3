FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install --production=false || yarn || pnpm i
COPY tsconfig.json ./
COPY src ./src
COPY migrations ./migrations
RUN npm run build
EXPOSE 4000
CMD ["node", "dist/index.js"]

