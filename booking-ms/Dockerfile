FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i 

COPY . .

ENV PORT=5002
ENV APP_NAME="Tickets-ms"
ENV DB_BASE_URL="mongodb+srv://"
ENV DB_USERNAME='romany'
ENV DB_PASSWORD='rafie208'
ENV DB_SERVER='cluster0.mc0cc.mongodb.net/tickets-app?retryWrites=true&w=majority'
ENV DB_PORT='27017'

EXPOSE 5002

CMD ["npm", "run", "dev"]
