FROM node:8
WORKDIR /app
COPY ./app/package*.json ./

RUN npm install -g yarn

COPY ./app ./

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]