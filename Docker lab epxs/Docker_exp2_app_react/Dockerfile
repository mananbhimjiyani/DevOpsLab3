# 1. Use Node image
FROM node:18-alpine AS build

# 2. Set working directory
WORKDIR /app

# 3. Copy dependency files
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy source files
COPY . .

# 6. Build app
RUN npm run build

# 7. Serve with vite preview
EXPOSE 4173
CMD ["npm", "run", "preview"]
