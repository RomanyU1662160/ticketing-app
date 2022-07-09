FROM node:14-alpine

WORKDIR  /usr/src/app

COPY  package*.json  ./ 

RUN npm i 

COPY . .

ENV PORT=5001
ENV APP_NAME="auth-ms"
ENV DB_URL="mongodb+srv://romany:rafie208@cluster0.mc0cc.mongodb.net/microservices-ticket-app?retryWrites=true"

EXPOSE 5001

CMD ["npm" , "run" , "dev"]