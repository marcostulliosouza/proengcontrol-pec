FROM node:20 as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --only=prod --silent

COPY . .

RUN npm install -g serve

EXPOSE 5000

CMD npm start

CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:5000"]