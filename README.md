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
  - Gerar chave ssh para liberar no github no terminal `ssh-keygen`
  - Procurar a chave em `C:\Users\<usuario>\.ssh\id_rsa.pub` e copiar para o github em Configurações da conta > Chaves SSH e GPG
  - Comandos GIT:
    * Clonar um repositório do github `git clone git@github.com:nome-do-usuario/repositorio.git`
    * Status de um repositório `git status`
    * Logs de commits de um repositório `git log`
    * Baixar repositório atualizado `git pull origin master`
    * Adicionar arquivos `git add <arquivos>` ou para adicionar todos os arquivos novos `git add .`
    * Criar um commit com as alterações `git commit -m "Mensagem de alteração"`
    * Atalho: Adicionar todos os arquivos alterados já com o commit `git commit -am "Mensagem de alteração"`
    * Subir as alteraçõs no repositório remoto (github) `git push origin master`

### Powershell 7
  - Link para download: https://github.com/PowerShell/PowerShell

### WSL2 (Windows Sub-system Linux)
  - Necessário para rodar o docker;
  - Como instalar o `WSL2` no Windows: https://docs.microsoft.com/pt-br/windows/wsl/install-win10
  - Instalar o Ubuntu 20 pela Microsoft Store
  - Configurando o `WSL2`: https://docs.microsoft.com/pt-br/windows/wsl/wsl-config
    * Basta criar no diretório `C:\Users\<Usuário>` o arquivo `.wslconfig`
    * Utilizaremos as seguintes configurações:
    ```
    [wsl2]
    memory=3GB # Limita a memória da VM para 3GB
    processors=1 # Monta a VM do WSL2 com 1 processador virtual
    ```
  - Listar todas as instâncias WSL rodando: `wsl -l -v`
  - Iniciar uma instância específica: `wsl -d <instancia>`
  - Desligar uma instância específica: `wsl -t <instancia>`
  - Desligar o WSL: `wsl --shutdown`
  - Listar todos os comandoss: `wsl --help`

### Windows Terminal
  - Baixar na Microsoft Store;

### Vscode
  - Link para download: https://code.visualstudio.com/download
  - Sincronizar com a conta do github `gu-nogueira` para puxar todas as configs, plugins, preferências, etc.
  - Configurar terminal com o diretório do Powershell 7 `C:\Program Files\PowerShell\7\pwsh.exe`
  - Plugins utilizados:
    * Bracket Pair Colorizer;
    * DotENV;
    * Dracula Official;
    * EditorConfig;
    * ESLint;
    * GitLens; `Fazer login no github`
    * Live Share;
    * Material Icon;
    * Node.js exec;
    * Rocketseat React Native;
    * Rocketseat ReactJS;
    * Tabnine Autocomplete AI; `Fazer login`
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
  - Comandos equivalentes de yarn e npm: https://shift.infinite.red/npm-vs-yarn-cheat-sheet-8755b092e5cc
  - Checar versão do yarn: `yarn -v`
  - Checar e instalar se necessário todas as dependências de um projeto: `yarn`


## Criando um novo projeto

  
  ## Padronização de código

  ### ESLint (necessário extensão vscode)
  - Ferramenta que padroniza o código de acordo com o padrão de alguma empresa;
  ...
  > Modulo 2, aula 6

  ### Prettier (integração com ESLint)
  - Deixa o código mais bonito. Separa linhas muito grandes;
  ...
  > Modulo 2, aula 6

  ### Editor config (extensão vscode)
  - Padronização entre ambiente com diferentes editores de código;
  - Na pasta raiz do projeto, botão direito: `generate .editorconfig`
  - Adicionar no `.editorconfig`:
  ```js
  trim_trailing_whitespace = true
  insert_final_newline = true
  ```

# Backend
  - `mkdir backend`
  - `cd \backend`
  - Iniciar o package.json para cuidar das dependências do projeto com o parâmetro -y, aceitando todas as questões `yarn init -y`
  - Instalar o framework express `yarn add express`
  - Iniciar o nodemon para reiniciar automaticamente o servidor quando houver alterações no projeto, com o parâmetro '-D' para instalar em modo de desenvolvimento `yarn add nodemon -D`
    - Para configurar o nodemon, vamos no `package.json` do backend e inserir a seguinte configuração
    ```json
    "scripts": {
    "dev": "nodemon index.js"
    },
    ```
    - Dessa forma, rodaremos o servidor com nodemon utilizando o comando `yarn dev`
  - Criar o arquivo para iniciar o servidor `index.js` incluindo o código para iniciar
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
  - Instalar o compilador sucrase para interpretar sintaxe moderna de javascript no node `yarn add sucrase`
    - Configurar o nodemon para compilar qualquer extensão `.js` com o sucrase:
    - Criar um arquivo na pasta raiz do projeto (backend): `nodemon.json`
    ```json
    {
      "execMap": {
        "js": "node -r sucrase/register"
      }
    }
    ```
    - Configurar o nodemon e o vscode para debugar com o sucrase:
      * Iremos alterar no arquivo `package.json` os nossos `"scripts"`, ficando da seguinte forma:
      ```json
      {
      "scripts": {
        "dev": "nodemon src/server.js",
        "dev:debug": "nodemon --inspect src/server.js"
      },
      ```
      * Na aba debug do vscode, criar uma nova configuração `package.json`, mudar os seguintes campos:
      ```json
      {
      ...
      "request": "attach",
      "restart": true,
      "protocol": "inspector"
      }
      ```
      * Agora, rodamos o servidor com `yarn dev:debug` e debugamos com os breakpoins e clicando em play na aba debug do vscode

  ## Containers

  ### Docker
  - Link para download: https://docs.docker.com/get-docker/
    * No windows é necessário utilizar o `WSL` ou o `Hyper-V` para virtualizar o docker
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

  ### Bancos relacionais | PostgreSQL
  - Link para montar o container: https://hub.docker.com/_/postgres
  `docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`
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

  ## Continuando a aplicação

  ### Sequelize
  - ORM para bancos de dados relacionais (SQLs)
  - Tabelas do banco viram models (ex: tabela.js)
  - Migrations
    * Controle de versionamento do banco de dados
    * Cada arquivo é uma migração, contendo instruções para criação, alteração ou remoção de tabelas ou colunas
  - Seeds:
    * Populam a base de dados para desenvolvimento
  - Instalar com `yarn add sequelize`
  - Instalar a interface de linha de comando, como dependência de desenvolvimento: `yarn add sequelize-cli -D`
  - Configurar estrutura de pastas:
  ```
  > app > controllers
  > app > models
  > config > database.js
  > database > migrations
  ```
  - Criar na raiz do projeto: `.sequelizerc` e mudar sintaxe do arquivo para javascript
  - Dentro de sequelize, temos por padrão:
  ```js
  const { resolve } = require('path');

  module.exports = {
    config: resolve(__dirname, 'src', 'config', 'database.js'),
    'models-path': resolve(__dirname, 'src', 'app', 'models'),
    'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
    'seeders-path': resolve(__dirname, 'src', 'database', 'seeds'),
  }
  ```

  ### Configurando PostgreSQL para o Sequelize
  - Vamos precisar de duas dependências: `yarn add pg pg-hstore`
  - No arquivo `database.js`, vamos inserir:
  ```js
  module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'gobarber',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  };
  ```

  ### Criando uma migration
  - Criar uma tabela: `yarn sequelize migration:create --name=create-tabela`
  - Configurar os campos da tabela no arquivo gerado, exemplo:
  ```js
  module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
    down: async (queryInterface) => {
     await queryInterface.dropTable('users');
    }
  };
  ```
  - Rodando a migration no banco de dados: `yarn sequelize db:migrate`
  - No pgAdmin, as tables ficam em databases > gobarber > Schemas > public > Tables
  - O sequelize cria uma tabela `sequelizeMeta`, onde ficam registradas as migrations que rodaram
  - Revertendo uma migration no banco de dados: `yarn sequelize db:migrate:undo`
  - Revertendo todas as migrations no banco de dados: `...:undo:all`

  ### Criando uma model
  - Utilizamos a arquitetura MVC para manipular o banco
  - Vamos criar em models o arquivo `tabela.js` e inserir o código:
  ```js
  import Sequelize, { Model } from 'sequelize';

  class User extends Model {
    static init(sequelize) {
      super.init({
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      });
    };
  }
  export default User;
  ```

  ### Criando loader de models
  - Este arquivo será responsável por criar a conexão com o banco e carregar todos os models que temos em nossa aplicação
  - Vamos criar em database um arquivo `index.js`
  ```js
  import Sequelize from 'sequelize';
  // Models
  import Users from '../app/models/Users';

  import databaseConfig from '../config/database';

  const models = [Users];

  class Database {
    constructor() {
      this.init();
    }
    init() {
      this.connection = new Sequelize(databaseConfig);
      models.map(model => model.init(this.connection));
    }
  }
  export default new Database();
  ```
  - E por fim, vamos importar o index do database em `app.js`
  ```js
  import './database';
  ```

  ### Criação de um controller (inserção)
  - Vamos criar em controllers um novo arquivo `UsersController.js` e inserir:
  ```js
  import Users from '../models/Users';

  class UsersController {
    async store(req, res) {
      // Verifica se o email já existe
      const userExists = await Users.findOne({ where: { email: req.body.email } });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
      
      const { id, name, email, provider } = await Users.create(req.body);
      return res.json({
        id,
        name,
        email,
        provider,
      });
    }
  };

  export default new UsersController ();
  ```
  - Agora, em `routes.js` vamos importar o controller e inserir a rota `'/users'` com método POST :
  ```js
  import UsersController from './app/controllers/UsersController';

  ...

  routes.post('/users', UsersController.store);
  ```

  ### Criando um relacionamento entre Tabelas
  - Temos duas formas de fazer isso:
    1. Desfazendo todas as migrations e adicionando as alterações nas Tabelas
    2. Criar uma nova migration informando as alterações nas tabelas (conseguimos fazer isso pois as migrations funcionam como uma linha do tempo)
  - Vamos criar uma nova migration com um nome bem descritivo: `yarn sequelize migration:create --name=add-avatar-field-to-users` e inserir nesta migration
  ```js
  'use strict';
  module.exports = {
    up: async (queryInterface, Sequelize) => 
      await queryInterface.addColumn(
        'users',
        'avatar_id',
        {
          type: Sequelize.INTEGER,
          references: { model: 'files', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        }
      )
    },
    down: async (queryInterface) => {
      await queryInterface.removeColumn('users', 'avatar_id');
    }
  };
  ```
  - Agora vamos rodar `yarn sequelize db:migrate`
  - Agora vamos montar o relacionamento nos models. Primeiro, em `Users.js`
  ```js
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  }
  ```
  - Agora, vamos inserir um novo `.map()` no array models de `database > index.js`
  ```js
  .map(model => model.associate && model.associate(this.connection.models));
  ```

  ### Encriptografar um dado
  - Instalar a biblioteca bcryptjs: `yarn add bcryptjs`
  - Para utilizálo, vamos user o método `addHook()` do Sequelize. Em um model, da seguinte forma:
  ```js
  import bcrypt from 'bcryptjs';

  ...

  this.addHook('beforeSave', async (user) => {   
    if (user.password) {
      user.password_hash = await bcrypt.hash(user.password, 8);
    }
  });

  return this;
  ```
  
  ### Lidando com autenticação JWT
  - Instalar a biblioteca JWT: `yarn add jsonwebtoken`
  - Vamos criar em controllers o arquivo `SessionController.js` para autenticar o usuário e retornar o token
  - Para checar se o usuário está autenticado usando middlewares, vamos criar a pasta `middlewares` em `app`
  - Vamos criar o arquivo `auth.js` para verificar se o usuário está autenticado ao tentar acessar qualquer rota

  ### Validando dados de entrada no backend
  - Vamos utilizar a biblioteca Yup: `yarn add yup`

  ## Lidando com requisições de arquivos físicos
  - O único tipo de corpo de requisição que suporta arquivos físicos é o multipart/form-database
  - Para isso, vamos utilizar a biblioteca Multer: `yarn add multer`
  - Com o multer, vamos hospedar o arquivo no servidor e geral um index para este arquivo no banco
  - Vamos criar na raiz do projeto as pastas `temp > uploads`
  - Vamos criar dentro de `src > config` o arquivo `multer.js`:
  ```js
  import multer from 'multer';
  import crypto from 'crypto';
  import { extname, resolve } from 'path';

  export default {
    storage: multer.diskStorage({
      destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, res) => {
          if (err) return cb(err);
          return cb(null, res.toString('hex') + extname(file.originalname));
        })
      },
    }),
  }
  ```
  - Agora vamos testar inserindo em `routes.js`:
  ```js
  import multer from 'multer';
  import multerConfig from './config/multer';
  ...
  const upload = multer(multerConfig);
  ...
  routes.post('/files', upload.single('file'), (req, res) => { res.json({ ok: true }) })
  ```
  - Vamos criar uma nova tabela (migration), model e controller

  ## Lidando com datas no node
  - Vamos instalar o date-fns em sua versão atual: `yarn add date-fns@next`

  ## Bancos não-relacionais | MongoDB
  - Não se pode fazer relacionamentos entre tabelas em um banco não relacional
  - Extremamente performático
  - Vamos subir uma nova imagem docker para o mongoDB: `docker run --name=mongodatabase -p 27017:27017 -d -t mongo`
  - Vamos conectar o MongoDB em `database > index.js`:
  ```js
  mongo() {
    this.mongoConnection = Mongoose.connect(
      'mongodb://10.0.10.140:27017/gobarber',
      { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true }
    )
  }
  ```

  ### Mongoose
  - ODM para bancos não relacionais (mais especificamente para o MongoDB)
  - Vamos instalar com `yarn add mongose`
### Frontend
  - ReactJS
### Mobile
  - React Native
