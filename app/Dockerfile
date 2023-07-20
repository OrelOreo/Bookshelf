FROM node:19.9-alpine3.17 as builder

WORKDIR /frontend

COPY package.json package-lock.json ./
 
RUN npm install

FROM node:19.9-alpine3.17 as runtime

WORKDIR /frontend
COPY --from=builder /frontend .
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
