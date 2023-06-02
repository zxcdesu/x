FROM docker.io/node:18.16.0-alpine

# RUN npm install -g npm
# RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .
