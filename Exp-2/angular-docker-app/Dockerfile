# Dockerfile (Production)
FROM node:20 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2 - Serve with NGINX
FROM nginx:stable-alpine
COPY --from=builder /app/dist/angular-docker-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
