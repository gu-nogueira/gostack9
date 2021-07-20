import 'dotenv/config';

// Essa sintaxe de import express from 'express', faz a MESMA coisa que const express = require('express');
import express from 'express';
// Vamos importar o path do node para levar até a nossa pasta de uploads
import path from 'path';

// Importando a monitoria de erros assíncronos do express
import 'express-async-errors';

// Aqui é importado o arquivo routes.js
import routes from './routes';

// Importando Youch para tratativa de erros no console
import Youch from 'youch';

// Vamos importar o sentry para monitoria do projeto
import * as Sentry from '@sentry/node';
import * as Tracing from "@sentry/tracing";
import sentryConfig from './config/sentry';

// Preciso agora chamar a minha database, somente import sem o from pois não preciso pegar o retorno dele
import './database'; // Detalhe: não preciso passar index.js pois vai pegar automaticamente

// Classe em javascript
class App {
  // Este é um método. O método constructor() é chamado automaticamente quando nossa classe App for instanciada.
  constructor() {
    // Isso é o mesmo que declarar a const server = express();
    this.server = express();

    // Inicializando o Sentry
    Sentry.init(sentryConfig);

    console.timeLog("Load time");
    console.log('Loading routes...');



    // Necessário para chamar os métodos, os executa, da mesma forma como executa as funções
    this.middlewares();
    this.routes();
    this.exceptionHandler();
    console.timeEnd("Load time");
    console.log('Complete!');
  }

  // Neste método serão inseridos todos os middlewares da aplicação
  middlewares() {
    // Defino os middlewares Sentry antes de qualquer middlewares
    this.server.use(Sentry.Handlers.requestHandler({
      ip: true,
    }));
    this.server.use(Sentry.Handlers.tracingHandler());
    // Também pode ser App.server.use... Que equivale também ao antigo server.use...
    this.server.use(express.json());
    // Vamos utilizar um recurso .static do express que permite servir arquivos estáticos como imagens, css, html, etc... Arquivos que podem ser acessados diretamente do navegador
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
  }

  // Neste método ficarão as rotas da aplicação
  routes() {
    // Aqui pode ser usado o '.use' para as rotas, pois elas também são consideradas middlewares
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  // Vamos criar um novo método para tratar as exceções
  exceptionHandler() {
    // Vamos cadastrar um novo middleware. Para que os erros assíncronos caiam neste método é necessário passar 'err' antes de tudo. O Express entende que quando um middleware possui 4 parâmetros a ser recebido ele é um middleware de tratamento de exceções
    this.server.use(async (err, req, res, next) => {
      // vamos instanciar Youch e passar como parâmetro para ele o erro e a requisiçao. Vamos usar o '.toJSON' pois estamos desenvolvendo uma API Rest, mas há também a versão em html com '.toHTML()'

      if (process.env.NODE_ENV == 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });

    });
  }
}

// Nessa linha, estamos exportando a instância de App
// Exportamos, e instanciamos App
// A única coisa que vamos exportar da classe app é o server, portanto '.server' no final
// export default faz a MESMA coisa que module.exports, porém module.exports é a sintaxe antiga
export default new App().server;
