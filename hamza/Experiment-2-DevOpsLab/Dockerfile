# Stage 1: Build Angular App
FROM node:22 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve app with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/my-angular-app/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
