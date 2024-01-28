FROM node:20-alpine
WORKDIR /App
COPY package*.json ./
COPY . .
RUN yarn install
CMD ["yarn","run","dev"]

