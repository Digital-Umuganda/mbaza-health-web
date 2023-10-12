FROM node:20.8.0-bullseye-slim as builder

# Copy package.json and yarn.lock to working directory
COPY package*.json yarn.lock ./

# Install dependencies and devDependencies
RUN yarn install --frozen-lockfile

RUN yarn build

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

EXPOSE 5000

CMD ["yarn", "preview"]
