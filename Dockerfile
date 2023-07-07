# Build application
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# Host application
FROM nginx:latest
COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 8080