FROM node:lts-alpine

WORKDIR /usr/app

COPY ["package*.json", "babel.config.js", "static.json", "./"]
RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm", "start"]