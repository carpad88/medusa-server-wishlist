FROM node:17.1.0

WORKDIR /app/medusa

COPY package*.json .
COPY yarn.lock .

EXPOSE 9000

RUN apt-get update

RUN apt-get install -y python

RUN npm install -g npm@latest

RUN npm install -g @medusajs/medusa-cli@latest

RUN npm install

COPY . .

ENTRYPOINT ["./develop.sh"]
