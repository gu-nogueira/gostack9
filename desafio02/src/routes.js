import { Router } from 'express';

// Controllers
import SessionsController from './app/controllers/SessionsController';
import RecipientsController from './app/controllers/RecipientsController';

// Middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionsController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientsController.store);
routes.put('/recipients', RecipientsController.update);
routes.get('/recipients', RecipientsController.index);

export default routes;
