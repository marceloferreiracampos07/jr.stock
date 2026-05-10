# Estágio de Build/Run
FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências (incluindo as de desenvolvimento para o Vitest)
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta que o servidor usa
EXPOSE 3333

# Comando para iniciar o servidor
CMD ["npm", "start"]
