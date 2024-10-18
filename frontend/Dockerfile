FROM node:18.18.2-bullseye-slim

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
