FROM node:20 as build

ENV HOME=/home/app
WORKDIR $HOME

COPY package.json ./
RUN npm install --only=prod --silent

RUN rm -rf node_modules package-lock.json && npm install

COPY . /home/app
RUN npm run build

EXPOSE 80