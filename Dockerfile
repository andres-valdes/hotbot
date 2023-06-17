FROM node:19-alpine

WORKDIR /usr/src/app

RUN apk update
RUN apk add build-base
RUN apk add ffmpeg
RUN apk add libsodium
RUN apk add make
RUN apk add automake
RUN apk add libtool
RUN apk add autoconf
RUN apk add clang
RUN apk add python3
RUN npm install -g typescript

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN rm -rf src

CMD [ "npm run", "start-prod" ]