// Aqui importamos somente o item Router do express, e não o express inteiro
import { Router } from 'express';

// Instancia o item Router do express (inicia) e armazena na const routes
const routes = new Router();

// Aqui, podemos utilizar as rotas da mesma forma que utilizávamos no modulo 01 com server.get
routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
})

// Exporta o routes para app.js
export default routes;