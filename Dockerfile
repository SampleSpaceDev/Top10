FROM node:20-alpine
WORKDIR /app
COPY package.json .

RUN npm install

COPY . .

RUN chmod +x /app/start.sh
ENTRYPOINT ["/app/start.sh"]