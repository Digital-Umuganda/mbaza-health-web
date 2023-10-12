FROM node:20.8.0-bullseye-slim as builder

COPY package*.json ./

RUN yarn install

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

EXPOSE 5000
CMD ["yarn", "dev"]