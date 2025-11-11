FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p uploads/temp

EXPOSE 5000

CMD ["npm", "run", "start:migrate"]