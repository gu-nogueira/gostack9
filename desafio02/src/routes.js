import { Router } from 'express';

// Controllers
import SessionsController from './app/controllers/SessionsController';

// Middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionsController.store);

routes.use(authMiddleware);

routes.get('/teste', (req, res) => {return res.json({ message: 'Teste verificação se o usuário está autenticado.' })})

export default routes;
