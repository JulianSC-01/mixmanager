# Build application
FROM node:25-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
# Host application
FROM nginx:stable
COPY --from=build /app/nginx-default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/browser /usr/share/nginx/html
EXPOSE 80