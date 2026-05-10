# Estágio de Build/Run
FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta padrão do Nuxt
EXPOSE 3000

# Define as variáveis de ambiente para o host do Nuxt
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Comando para rodar em modo desenvolvimento (ajuste para 'npm run build && npm start' em produção)
CMD ["npm", "run", "dev"]
