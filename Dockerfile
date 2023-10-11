FROM node:14.20.1-bullseye as builder

COPY package*.json ./

RUN yarn install

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

EXPOSE 5000
CMD ["yarn", "start"]