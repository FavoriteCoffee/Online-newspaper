FROM node:lts-alpine
WORKDIR /Online-newspaper/front
COPY front/front/package*.json ./
RUN npm install

COPY front/front .
EXPOSE 3000
ENTRYPOINT ["npm", "run", "dev"]