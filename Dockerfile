# Build application
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# Host application
FROM registry.access.redhat.com/ubi8/nginx-122
COPY --from=build /app/build/ .
CMD nginx -g "daemon off;"