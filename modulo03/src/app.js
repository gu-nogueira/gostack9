// Essa sintaxe de import express from 'express', faz a MESMA coisa que const express = require('express');
import express from 'express';
// Vamos importar o path do node para levar até a nossa pasta de uploads
import path from 'path';
// Aqui é importado o arquivo routes.js
import routes from './routes';
// Preciso agora chamar a minha database, somente import sem o from pois não preciso pegar o retorno dele
import './database'; // Detalhe: não preciso passar index.js pois vai pegar automaticamente

// Classe em javascript
class App {
  // Este é um método. O método constructor() é chamado automaticamente quando nossa classe App for instanciada.
  constructor() {
    // Isso é o mesmo que declarar a const server = express();
    this.server = express();

    // Necessário para chamar os métodos, os executa, da mesma forma como executa as funções
    this.middlewares();
    this.routes();
    console.log('Server is running...');
  }

  // Neste método serão inseridos todos os middlewares da aplicação
  middlewares() {
    // Também pode ser App.server.use... Que equivale também ao antigo server.use...
    this.server.use(express.json());
    // Vamos utilizar um recurso .static do express que permite servir arquivos estáticos como imagens, css, html, etc... Arquivos que podem ser acessados diretamente do navegador
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
  }

  // Neste método ficarão as rotas da aplicação
  routes() {
    // Aqui pode ser usado o '.use' para as rotas, pois elas também são consideradas middlewares
    this.server.use(routes);
  }
}

// Nessa linha, estamos exportando a instância de App
// Exportamos, e instanciamos App
// A única coisa que vamos exportar da classe app é o server, portanto '.server' no final
// export default faz a MESMA coisa que module.exports, porém module.exports é a sintaxe antiga
export default new App().server;
