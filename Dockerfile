FROM node:20.8.0-bullseye-slim as builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock to working directory
COPY package*.json yarn.lock ./

# Install dependencies and devDependencies
RUN yarn install --frozen-lockfile

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN yarn build

EXPOSE 5000

CMD ["yarn", "preview","--host","0.0.0.0"]
