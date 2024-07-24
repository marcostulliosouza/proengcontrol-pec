# Etapa de construção
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
ENV TZ=America/Sao_Paulo
RUN npm install
COPY . ./
RUN npm run build

# Etapa de produção
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 90
CMD ["nginx", "-g", "daemon off;"]