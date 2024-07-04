FROM node:20 as build

ENV HOME=/home/app
WORKDIR $HOME

COPY package.json ./
RUN npm install --only=prod --silent

RUN npm install esbuild@0.21.5 --save-dev

RUN npm cache clean --force && rm -rf node_modules package-lock.json && npm install

COPY . .
RUN npm run build

EXPOSE 80