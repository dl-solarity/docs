FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY .env.deploy .env

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine AS web

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]