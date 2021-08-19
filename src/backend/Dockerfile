FROM node:lts-alpine

RUN \
    apk update && \
    apk upgrade && \
    apk add --no-cache git;

WORKDIR /usr/app

COPY package*.json ./
RUN npm i

COPY . .

EXPOSE 4000

CMD ["npm", "start"]