FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production
COPY index.js .
ENV PORT=3004
EXPOSE 3004
CMD ["node", "index.js"]
