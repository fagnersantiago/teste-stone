# Estágio 1: Para instalar as dependências e executar os testes
FROM node 

WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN yarn test

FROM node
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001

CMD ["npm", "run", "start:dev", "yarn test"]
