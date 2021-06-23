// Aqui importamos somente o item Router do express, e não o express inteiro
import { Router } from 'express';

// Agora vamos importar os controllers para manipular os models
import UsersController from './app/controllers/UsersController';
import SessionController from './app/controllers/SessionController';

// Instancia o item Router do express (inicia) e armazena na const routes
const routes = new Router();

// Aqui, podemos utilizar as rotas da mesma forma que utilizávamos no modulo 01 com server.get

// Aqui, fazemos um POST para UsersControllers, utilizando o método que foi importado de lá '.store'
routes.post('/users', UsersController.store);
routes.post('/sessions', SessionController.store);

// Exporta o routes para app.js
export default routes;
