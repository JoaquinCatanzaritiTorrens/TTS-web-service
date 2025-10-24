FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

# ---- Nginx ----
FROM nginx:alpine AS production

RUN rm -f /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/templates/default.conf.template

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 6000

CMD ["nginx", "-g", "daemon off;"]