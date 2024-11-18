FROM node:alpine3.20

WORKDIR /opt/app

COPY . .

RUN npm install --force

CMD [ "npm", "run", "docs:dev" ]