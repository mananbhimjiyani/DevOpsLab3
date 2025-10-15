FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production
COPY index.js .
ENV PORT=3003
EXPOSE 3003
CMD ["node", "index.js"]
