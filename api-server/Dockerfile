FROM node:19.9-alpine3.17 as builder

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

FROM node:19.9-alpine3.17 as runtime

WORKDIR /app
COPY --from=builder /app .
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]