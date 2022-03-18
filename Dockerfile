FROM node:16

WORKDIR /auction-app

COPY package.json .

RUN npm install

COPY . .

CMD npm start