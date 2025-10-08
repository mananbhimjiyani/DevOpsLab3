FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY main.js /usr/share/nginx/html/main.js
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
