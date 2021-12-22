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

### mongo-express | MongoDB admin Interface
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

### ORMs | Sequelize
- ORM para bancos de dados relacionais (SQLs);
  * Sequelize;
  * Prisma;
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
- Vamos criar na raiz do projeto as pastas `tmp > uploads`
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
export default {
  host: 'br644.hostgator.com.br',
  port: '465',
  secure: true,
  auth: {
    user: 'gustavo@onmai.com.br',
    pass: 'PuBT^c*a@Y~C',
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};
```
- Serviços de e-mail:
* Amazon SES;
* Mailgun;
* Sparkpost;
* Mandril (Mailchimp);
* Hostgator;
* Mailtrap.io (Funciona somente p/ ambiente de desenvolvimento);
- Vamos criar uma pasta `src > lib`, onde vamos configurar coisas adicionais da aplicação. Dentro de lib ficará todas as configurações de serviços adicionais que iremos utilizar, para não criarmos controllers para isso;
- Vamos criar em `lib > Mail.js`:
```js
import { resolve } from 'path';
import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';
class Mail {
  constructor() {
    const { name, host, port, secure, auth } = mailConfig;
    this.transporter = nodemailer.createTransport({
      name,
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }
  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}
export default new Mail();
```

## Templates de e-mail com Handlebars
- Vamos utilizar template engines para criar e-mails com html / css, utilizando também variáveis do node
- Instalando Handlebars, integrado com express e com nodemailer `yarn add express-handlebars nodemailer-express-handlebars`
- Vamos criar os seguintes diretórios: `app > views > emails > layouts & partials`
- E os seguintes arquivos: `layouts > default.hbs` e `partials > footer.hbs`
- Em `lib > Mail.js`, precisaremos importar as integrações do handlebars com o express e o nodemailer, para isso:
```js
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
```
- Agora, em `lib > Mail.js`, vamos inserir o seguinte método:
```js
configureTemplates() {
  const viewPath = resolve(__dirname, '..', 'src', 'app', 'views', 'emails');
  this.transporter.use('compile', nodemailerhbs({
    viewEngine: exphbs.create({
      layoutsDir: resolve(viewPath, 'layouts'),
      partialsDir: resolve(viewPath, 'partials'),
      defaultLayout: 'default',
      extname: '.hbs',
    }),
    viewPath,
    extName: '.hbs',
  }));
}
```
- Feito isso, vamos configurar o layout padrão para ser usado em todos os e-mails em `layouts > default.hbs`:
```hbs
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.6; color: #222; max-width: 600px;">
  {{{ body }}}
</div>
```
- Agora vamos criar os partials, que serão utilizados em tipos específicos de e-mail em `partials > footer.hbs`:
```hbs
<br />
Equipe GoBarber
```
- Por fim, finalmente importamos o partial `footer.hbs` dentro de `default.hbs`, inserindo-o como `{{> footer }}`
- Podemos inserir uma variável também com `{{ nome_da_variável }}`

## Bancos chave-valor | Redis
- Será utilizado para a funcionalidade de filas (background jobs) dentro da aplicação
- Banco não relacional (noSQL) assim como mongoDB, porém só aceita chaves e valores, tornando-o extremamente performático e robusto 
- Vamos iniciar um container com `docker run --name redis -p 6379:6379 -d -t redis:alpine`
- Vamos criar um arquivo de configuração em `config > redis.js`:
```js
export default {
  host: '10.0.10.140',
  port: 6379,
}
```

## Filas com Bee Queue
- Também chamados de background jobs
- Usado para:
  * Controlar ações que levam um pouco mais de tempo e não precisam finalizar no mesmo momento da resposta para o cliente
  * Controle de erros
  * Retentativas automáticas
  * Prioridades na fila
- Vamos utilizar uma biblioteca (ferramenta) de filas. Temos as seguintes opções:
  * Bee Queue (Mais performático, porém não aceita prioridades de filas);
  * Kue (Menos performático, porém consegue lidar com prioridades);
  * Bull
- Vamos instalá-lo com `yarn add bee-queue`
- Vamos criar um arquivo em `lib > Queue.js`:
```js
import Bee from 'bee-queue';
import redisConfig from '../config/redis';
// Jobs
import OrderMail from '../app/jobs/OrderMail';
import CancellationMail from '../app/jobs/CancellationMail';
const jobs = [OrderMail, CancellationMail];
class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }
  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
    console.log('Complete!');
  }
  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}
export default new Queue();
```
- Após isso, vamos configurar os Jobs da aplicação, criando um novo diretório em `app > jobs`
- Por fim, vamos criar um novo job dentro dessa pasta chamado `CancellationMail.js`:
```js
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }
  async handle({ data }) {
    const { appointment } = data;
    console.log('A fila executou!');
     await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date),"'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt
        }),
      },
    });
  }
}
export default new CancellationMail ();
```
- E por fim, vamos importar nossa fila em `<any>Controller.js`:
```js
import Queue from '../../lib/Queue';
// Importando jobs
import CancellationMail from '../jobs/CancellationMail';
...
  await Queue.add(CancellationMail.key, {
    appointment,
  });
```
- Com isso, temos uma receita de bolo de fila replicável em qualquer aplicação, podendo repassar qualquer dado pelo `Queue.add` no nossos arquivos de controller, podendo pegá-lo dentro da `const = { <variáveis> } = data;` em nossos arquivos de jobs
- E por fim, vamos criar um arquivo em `src > queue.js`:
```js
import Queue from './lib/Queue';
Queue.processQueue();
```
- Fazemos isso pois não iremos executar as filas no mesmo node (no mesmo processo) que a aplicação principal. Pois dessa forma podemos rodar nossas filas em outro servidor, num outro core do processador, totalmente a parte da aplicação principal. Dessa forma a fila nunca influenciará na performance do restante da aplicação
- Podemos executar o nosso arquivo de filas a parte agora com `node src/queue.js`. Lembrando que esse comando pode retornar um erro caso esteja utilizando `Sucrase` na aplicação. Para resolver esse problema, basta adicionar no arquivo `package.json` dentro de `"scripts:"{...}`:
```json
"queue": "nodemon src/queue.js"
```

# Tratando Exceções

- Ferramentas utilizadas para monitorar estabilidade, bugs e erros da aplicação
- Será utilizado em ambiente de produção
- Integrável com Slack, Email, GitHub (Issues) etc...
  * [Bugsnag](www.bugsnag.com);
  * [Sentry](sentry.io) - Possui uma ótima integração com Node.js;
- Para este caso, vamos utilizar o Sentry;
- Vamos criar um novo projeto, selecionar Node.js ou ExpressJS;
- O Sentry passará todas as instruções para integrar a monitoria no projeto. Neste exemplo, vamos rodar `yarn add @sentry/node @sentry/tracing`;
- Vamos precisar criar um novo arquivo em `config > sentry.js`, passando o dsn gerado pelo sentry:
```js
import * as Sentry from '@sentry/node';
import * as Tracing from "@sentry/tracing";
import app from './../app';

export default {
  dsn: 'https://22f00432e0a647f0b1f4da12e01b8b33@o923985.ingest.sentry.io/5871871',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express( app ),
  ],
  tracesSampleRate: 1.0,
};
```
- Depois, vamos importar o sentry em `src > app.js` e iniciá-lo depois de instanciar o express:
```js
import * as Sentry from '@sentry/node';
import * as Tracing from "@sentry/tracing";
import sentryConfig from './config/sentry';
...
this.server = express();
// Inicializando o Sentry
Sentry.init(sentryConfig);
// Before any middewares or routes
this.server.use(Sentry.Handlers.requestHandler({
  ip: true,
}));
this.server.use(Sentry.Handlers.tracingHandler());
// After all routes
this.server.use(Sentry.Handlers.errorHandler());
// Error handler for response (optional)
this.server.use(function exceptionHandler(err, req, res, next) {
  // Error id is attached to `res.sentry`
  return res.status(500).json(errors);
});
```

## Monitorando eventos assíncronos com Express
- Por padrão o Express não consegue captar eventos e erros assíncronos com async e await. Vamos resolver isso instalando `yarn add express-async-errors`
- Agora vamos importar em `src > app.js` antes de routes:
```js
import 'express-async-errors';
```

## Youch
- Biblioteca que dá uma tratativa dos logs de erros melhor para o desenvolvedor visualizar
- Instalando Youch: `yarn add youch`
- Importamos em `src > app.js`:
```js
import Youch from 'youch';
```

# Produção
Preparando aplicação para ambiente de produção (servidor).

## Configurando variáveis ambiente
- São variáveis que mudam de acordo com o ambiente (máquina), variáveis de conexão com banco, portas, etc...
- Todas as funcionalidades da aplicação que puderem variar de acordo com ambiente serão feitas dessa forma para padronizar
- Vamos criar um arquivo na raiz do projeto `.env`, este nome é global para qualquer aplicação de qualquer linguagem
- Deve ser adicionado ao `.gitignore` (caso haja), pois não deve ir para o repositório do GitHub
```r
APP_URL=http://localhost:2000
NODE_ENV=development

# Auth

# Até 32 caracteres
APP_SECRET=xvoip321

# Database

DB_HOST=10.0.10.140
DB_USER=postgres
DB_PASS=docker
DB_NAME=gobarber

# Mongo

MONGO_URL=mongodb://10.0.10.140:27017/gobarber

# Redis

REDIS_HOST=10.0.10.140
REDIS_PORT=6379

# Mail

MAIL_NAME=gobarber.com
MAIL_HOST=br644.hostgator.com.br
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USER=gustavo@onmai.com.br
MAIL_PASS=PuBT^c*a@Y~C

# Sentry

SENTRY_DSN=
# Only for production: https://22f00432e0a647f0b1f4da12e01b8b33@o923985.ingest.sentry.io/5871871
```
- Feito isso, vamos instalar a biblioteca dotenv `yarn add dotenv`
- E importá-lo para carregar as variáveis ambientes nos seguintes arquivos:
```js
src > app.js
src > config > database.js
lib > queue.js

import 'dotenv/config';
// ou
require('dotenv/config');
```
- Dessa forma, todas as variáveis ambientes poderão ser acessadas da variável global do node `process.env.`, agora vamos configurá-lo nos arquivos:
```js
src > app > models > File.js
// url que retorna o caminho dos arquivos
return `${process.env.APP_URL}/files`[...];

src > app.js
// verifica se o ambiente é de desenvolvimento para retornar erros por JSON
if (process.env.NODE_ENV == 'development') {
  const errors = await new Youch(err, req).toJSON();
  return res.status(500).json(errors);
}
return res.status(500).json({ error: 'Internal server error' });

src > config > auth.js
// secret para gerar hash de password
secret: process.env.APP_SECRET,

src > config > database.js
// conexão com postgreSQL
host: process.env.DB_HOST,
username: process.env.DB_USER,
password: process.env.DB_PASS,
database: process.env.DB_NAME,

src > database > index.js
// conexão com mongoDB
process.env.MONGO_URL,

src > config > redis.js
// Conexão com Redis
host: process.env.REDIS_HOST,
port: process.env.REDIS_PORT,

src > config > mail.js
// Conexão com email
name: process.env.MAIL_NAME,
host: process.env.MAIL_HOST,
port: process.env.MAIL_PORT,
secure: process.env.MAIL_SECURE,
auth: {
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
},

src > config > sentry.js
// Integração com Sentry
dsn: process.env.SENTRY_DSN,
```
- Vamos deixar um arquivo na raiz `.env.example` para servir de exemplo para novas configurações. Com as variáveis mas com valores que são sensíveis vazios.

# CORS (Cross-Origin Resource Sharing)

- Esta biblioteca permite que outras aplicações acessem a API: `yarn add cors`
- Ele pode ser adicionado na aplicação em `app.js` nos `middlewares()`:
```js
// Dev enviroment
this.server.use(cors());

// Production enviroment
this.server.use(cors({ origin:  'https://localhost:5000' }));
```
