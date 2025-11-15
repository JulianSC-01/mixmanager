# Build application
FROM node:24-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
# Host application
FROM nginx:latest
COPY --from=build /app/dist/browser /usr/share/nginx/html
EXPOSE 80