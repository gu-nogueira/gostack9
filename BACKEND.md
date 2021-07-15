# Backend
Montagem de aplicação backend com Node.js & Express

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

## Banco de dados

### Bancos relacionais | PostgreSQL
- Link para montar o container: https://hub.docker.com/_/postgres
`docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`
- Aqui, montamos o container conversando com o host na porta 5432

### pgAdmin | PostgreSQL admin interface
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

### Bancos não-relacionais | MongoDB
- Link para montar o container: https://hub.docker.com/_/mongo
- Não se pode fazer relacionamentos entre tabelas em um banco não relacional
- Extremamente performático
- Os schemas são como as tabelas de um banco SQL
- Schemas não precisam necessariamente possuir todas as "colunas" da tabela (schema free)
- Não utiliza migrations
- Vamos subir uma nova imagem docker para o mongoDB: `docker run --name=mongodb -p 27017:27017 -d -t mongo`
- Vamos conectar o MongoDB em `database > index.js`:
```js
mongo() {
  this.mongoConnection = Mongoose.connect(
    'mongodb://10.0.10.140:27017/gobarber',
    { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true }
  )
}
```
- E criar uma pasta em `app > schemas`

### mongo-express | MongoDB admin queryInterface
- Link para montar o container: https://hub.docker.com/_/mongo-express
- Antes de mais nada, iremos pegar o ip do container: `docker inspect <nome_do_container> | grep IPAddress`
- É necessário substituí-lo em `"mongodb://ip_do_container:27017"`
`docker run --name=mongodbgui -p 27018:8081 -e ME_CONFIG_MONGODB_URL="mongodb://172.17.0.4:27017" -e ME_CONFIG_MONGODB_ENABLE_ADMIN=true -e ME_CONFIG_BASICAUTH_USERNAME=gustavo@onmai.com.br -e  ME_CONFIG_BASICAUTH_PASSWORD=docker -e ME_CONFIG_OPTIONS_EDITORTHEME="dracula" -d mongo-express`
- Após rodar o container, vamos configurar os privilégios de administrador. Primeiro vamos acessar o container: `docker exec -it mongodbgui bash`
- Vamos acessar o arquivo `config.js` em: `vi /node_modules/mongo-express/config.js`
- E alterar o valor de enable admin na linha `116` para `true`


## Continuando a aplicação

### Mongoose
- ODM para bancos não relacionais (mais especificamente para o MongoDB)
- Vamos instalar com `yarn add mongose`

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

## Encriptografar um dado
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

## Lidando com autenticação JWT
- Instalar a biblioteca JWT: `yarn add jsonwebtoken`
- Vamos criar em controllers o arquivo `SessionController.js` para autenticar o usuário e retornar o token
- Para checar se o usuário está autenticado usando middlewares, vamos criar a pasta `middlewares` em `app`
- Vamos criar o arquivo `auth.js` para verificar se o usuário está autenticado ao tentar acessar qualquer rota

## Validando dados de entrada no backend
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

## Lidando com envios de e-mail
- Vamos instalar a biblioteca: `yarn add nodemailer`
- Vamos criar um arquivo em `config > mail.js`
```js

```
