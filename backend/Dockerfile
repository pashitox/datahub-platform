FROM node:18-bullseye

WORKDIR /app

# Instalar Nest CLI globalmente
RUN npm install -g @nestjs/cli

COPY package*.json ./
RUN npm install

COPY . .

# Compilar TypeScript
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:dev"]
