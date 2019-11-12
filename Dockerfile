FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm i postgres

COPY . .

EXPOSE 8080

RUN npm run build



CMD ["npm", "start"]

