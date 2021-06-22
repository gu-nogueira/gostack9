// Aqui importamos somente o item Router do express, e não o express inteiro
import { Router } from 'express';

// Vamos começar a importar os models que estão conectados com o banco
import User from './app/models/Users';

// Instancia o item Router do express (inicia) e armazena na const routes
const routes = new Router();

// Aqui, podemos utilizar as rotas da mesma forma que utilizávamos no modulo 01 com server.get
routes.get('/', async (req, res) => {

  const user = await User.create({
    name: 'Gustavo Nogueira',
    email: 'gus.h.nogueira@gmail.com',
    password_hash: '4234234324325',
  });

  return res.json({ user });
})

// Exporta o routes para app.js
export default routes;




/** O sequelize quando vai fazer uma operação no banco de dados, é um processo assíncrono, portanto devemos sempre utilizar await em qualquer operação do banco de dados pois não é em tempo real */
