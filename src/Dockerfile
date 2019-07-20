FROM node:10
WORKDIR /
COPY package*.json ./
RUN npm install
RUN npm install -g typescript
COPY . ./
RUN tsc
CMD [ "node", "server.js" ]
EXPOSE 8080