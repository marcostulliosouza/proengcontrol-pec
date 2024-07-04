FROM node:20 as build

ENV HOME=/home/app
WORKDIR $HOME

COPY package.json ./
RUN npm install --only=prod --silent

COPY . /home/app
RUN npm run build

EXPOSE 80