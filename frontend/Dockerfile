FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Instalar sin scripts de preparación
RUN npm install --ignore-scripts

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
