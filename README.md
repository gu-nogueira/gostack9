# Estudando JS, Node, ReactJS e React-Native

* [x] Completei o curso de Javascript;
  - Preciso estudar mais os usos das funções (métodos) de prototipação que se disponibiliza pelo próprio Javascrit;
* [x] Aprendi os conceitos do NodeJS e coloquei-os em prática no desafio01;
* [x] Aplicação Go Barber;

# Setup
Meu setup de ambiente de desenvolvimento web

## Instaladores

### Git 
  - Link para download: https://git-scm.com/downloads
  - Gerar chave ssh para liberar no github no terminal ```ssh-keygen```
  - Procurar a chave em ```C:\Users\<usuario>\.ssh\id_rsa.pub``` e copiar para o github em Configurações da conta > Chaves SSH e GPG
  - Comandos GIT:
    * Clonar um repositório do github ```git clone git@github.com:nome-do-usuario/repositorio.git```
    * Status de um repositório ```git status```
    * Logs de commits de um repositório ```git log```
    * Baixar repositório atualizado ```git pull origin master```
    * Adicionar arquivos ```git add <arquivos>``` ou para adicionar todos os arquivos novos ```git add .```
    * Criar um commit com as alterações ```git commit -m "Mensagem de alteração"```
    * Atalho: Adicionar todos os arquivos alterados já com o commit ```git commit -am "Mensagem de alteração"```
    * Subir as alteraçõs no repositório remoto (github) ```git push origin master```

### Powershell 7
  - Link para download: https://github.com/PowerShell/PowerShell

### Windows Terminal
  - Baixar na Microsoft Store;
  
### Vscode
  - Link para download: https://code.visualstudio.com/download
  - Sincronizar com a conta do github ```gu-nogueira``` para puxar todas as configs, plugins, preferências, etc.
  - Configurar terminal com o diretório do Powershell 7 ```C:\Program Files\PowerShell\7\pwsh.exe```
  - Plugins utilizados:
    * Bracket Pair Colorizer;
    * DotENV;
    * Dracula Official;
    * EditorConfig;
    * ESLint;
    * GitLens; ```Fazer login no github```
    * Live Share;
    * Material Icon;
    * Node.js exec;
    * Rocketseat React Native;
    * Rocketseat ReactJS;
    * Tabnine Autocomplete AI; ```Fazer login```
    * Vscode-styled-compoments;

### Insomnia
  - Link para download: https://insomnia.rest/download

### DevDocs
  - Link para download: https://www.electronjs.org/apps/devdocs-app
  - Linguagens a selecionar:
    * Javascript
    * ReactJS
    * React Native
    * Node

## Package manager

### Chocolatey
  - Link para instalação: https://chocolatey.org/install
### node LTS + npm
  - Link para instalação via package manager (chocolatey): https://nodejs.org/en/download/package-manager/#windows
### Yarn
  - Link para instalação via npm: https://yarnpkg.com/getting-started/install
  - Checar versão do yarn: ```yarn -v```
  

## Criando um novo projeto

  ## Backend
  - ```mkdir backend```
  - ```cd \backend```
  - Iniciar o package.json para cuidar das dependências do projeto com o parâmetro -y, aceitando todas as questões ```yarn init -y```
  - Instalar o framework express ```yarn add express```
  - Iniciar o nodemon para reiniciar automaticamente o servidor quando houver alterações no projeto, com o parâmetro '-D' para instalar em modo de desenvolvimento ```yarn add nodemon -D```
    - Para configurar o nodemon, vamos no ```package.json``` do backend e inserir a seguinte configuração
    ```json
    "scripts": {
    "dev": "nodemon index.js"
    },
    ```
    - Dessa forma, rodaremos o servidor com nodemon utilizando o comando ```yarn dev```
  - Criar o arquivo para iniciar o servidor ```index.js``` incluindo o código para iniciar
  ```node
  // Importando o express
  const express = require('express');
  // Instanciando para iniciar o servidor
  const server = express();
  // Plugin para interpretar requisições JSON
  server.use(express.json());

  // Código do servidor...

  // Inicia o servidor na porta definida: '3000'
  server.listen(3000);
  ```
  - Instalar o compilador sucrase para interpretar sintaxe moderna de javascript no node ```yarn add sucrase```
    - Configurar o nodemon para compilar qualquer extensão `.js` com o sucrase:
    - Criar um arquivo na pasta raiz do projeto (backend): ```nodemon.json```
    ```json
    {
      "execMap": {
        "js": "node -r sucrase/register"
      }
    }
    ```
    - Configurar o nodemon e o vscode para debugar com o sucrase:
      * Iremos alterar no arquivo ```package.json``` os nossos ```"scripts"```, ficando da seguinte forma:
      ```json
      {
      "scripts": {
        "dev": "nodemon src/server.js",
        "dev:debug": "nodemon --inspect src/server.js"
      },
      ```
      * Na aba debug do vscode, criar uma nova configuração ```package.json```, mudar os seguintes campos:
      ```json
      {
      ...
      "request": "attach",
      "restart": true,
      "protocol": "inspector"
      }
      ```
      * Agora, rodamos o servidor com ```yarn dev:debug``` e debugamos com os breakpoins e clicando em play na aba debug do vscode

  ## Containers

  ### Docker
  - Link para download: https://docs.docker.com/get-docker/
    * No windows é necessário utilizar o ```WSL``` ou o ```Hyper-V``` para virtualizar o docker
  - Iniciar (criar) um container:
    ```
    docker run
    --name > dá um nome ao container
    -e > uso de variáveis ambientes
    -p > redirecionamento de porta
    -d > nome da imagem a utilizar para criação do container
    --network > define a rede de conversação do container

    exemplo:

    docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
    ```
  - Listar todos os containers em execução:
    ```
    docker ps

    -a > lista todos os containers (até desligados):
    ``` 
  - Listar todas as imagens de containers:
    ```
    docker image ls
    ```
  - Iniciar um container desligado:
    ```
    docker start <NAME>
    ```
  - Ver os logs do container:
    ```
    docker logs <NAME>
    ```

  ### Podman
  - É tudo igual ao docker...
  
  ## Banco de dados

  ### PostgreSQL
  - Link para montar o container: https://hub.docker.com/_/postgres
  ```docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres```
  - Aqui, montamos o container conversando com o host na porta 5432

  ### pgAdmin
  - Link para download: https://www.pgadmin.org/download/
  - Link para montar o container *recomendado*: https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html
  ```bash
  docker pull dpage/pgadmin4
  docker run --name databasegui -p 5433:80 -e 'PGADMIN_DEFAULT_EMAIL=gustavo@onmai.com.br' -e 'PGADMIN_DEFAULT_PASSWORD=docker' -d dpage/pgadmin4
  ```
  - Aqui, montamos o container na porta 5433 (host), conversando com a porta 80 (container).
  - login: gustavo@onmai.com.br
  - senha: docker
  - Configurando servidor:
    ```
    Name: database
    Host: host.docker.internal
    Port: 5432
    User: postgres
    Pass: docker
    ```

    ### Sequelize
    - ORM para bancos de dados relacionais (SQLs);
    - Tabelas do banco viram models (ex: tabela.js);
    - Migrations

### Frontend
  - ReactJS
### Mobile
  - React Native