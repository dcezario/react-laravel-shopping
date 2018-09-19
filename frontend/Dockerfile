FROM node:8
WORKDIR /app
COPY ./app/package*.json ./

RUN npm install -g yarn

COPY ./app ./
COPY ./start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

EXPOSE 3000

ENTRYPOINT ["start.sh"]