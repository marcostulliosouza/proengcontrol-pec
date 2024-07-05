FROM node:20 as build

ENV HOME=/home/app
WORKDIR $HOME

COPY package.json ./
RUN npm install --only=prod --silent

RUN npm cache clean --force && rm -rf node_modules package-lock.json && npm install

COPY . .
RUN npm run build && echo "Build completed"
RUN echo "Contents of /home/app:" && ls -la /home/app && echo "Contents of /home/app/dist:" && ls -la /home/app/dist || echo "Dist directory not found"

RUN npm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]