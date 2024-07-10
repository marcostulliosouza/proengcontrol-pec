FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
ENV TZ=America/Sao_Paulo
RUN npm install
COPY . ./
EXPOSE 5000
CMD ["node", "server.js"]