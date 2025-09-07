FROM node:20

WORKDIR /app

# Copiar package.json primero para cache
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Compilar TypeScript
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:dev"]
