FROM node:6-alpine

RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app

WORKDIR /usr/src/app
RUN npm install

EXPOSE 3000
