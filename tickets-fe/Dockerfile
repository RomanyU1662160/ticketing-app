FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm i 
COPY . .

ENV CI=true
ENV WDS_SOCKET_PORT=0
ENV REACT_APP_AUTH_URL=http://tickets.io
EXPOSE 3000
CMD ["npm", "start"] 

