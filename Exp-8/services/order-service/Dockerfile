FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production
COPY index.js .
ENV PORT=3002
EXPOSE 3002
CMD ["node", "index.js"]