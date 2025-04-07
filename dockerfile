# Etapa 1: Build do projeto React

FROM node:18-alpine AS build
WORKDIR /app

# Copia os arquivos de configuração do projeto
COPY package.json package-lock.json* ./
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .
RUN npm run build

# Etapa 2: Configuração do NGINX para servir a aplicação React
FROM nginx:stable-alpine 
# Remove configuração default do NGINX se necessário
RUN rm /etc/nginx/conf.d/default.conf

# Copia o arquivo de configuração do NGINX
COPY nginx.conf /etc/nginx/conf.d

# Copia os arquivos buildados do Ract para o NGINX
COPY --from=build app/build /usr/share/nginx/html

# Expondo a porta 3000 para acesso externo
EXPOSE 3000

# Inicia o NGINX
CMD ["nginx", "-g", "daemon off;"]
