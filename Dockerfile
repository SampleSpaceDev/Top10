FROM node:20-alpine
WORKDIR /app
COPY package.json .

RUN npm install

COPY . .

RUN echo "npm start" > /app/start.sh
RUN chmod +x /app/start.sh
ENTRYPOINT ["/app/start.sh"]