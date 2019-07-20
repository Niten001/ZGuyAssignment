FROM node:10
WORKDIR /
COPY package*.json ./
RUN npm install
RUN npm install -g typescript
COPY . ./
RUN tsc --jsx react --target es6
CMD [ "node", "server.js" ]
EXPOSE 8080