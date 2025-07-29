# Stage 1: Build the Angular application
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/DockerAngluarApplication/browser/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]