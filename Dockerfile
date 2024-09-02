# Build application
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# Host application
FROM nginx:latest
COPY --from=build /app/dist/browser /usr/share/nginx/html
EXPOSE 80