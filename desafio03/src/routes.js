import { Router } from 'express';

// Multer
import multer from 'multer';
import multerConfig from './config/multer';

// Controllers
import SessionsController from './app/controllers/SessionsController';
import RecipientsController from './app/controllers/RecipientsController';
import FilesController from './app/controllers/FilesController';
import DeliverymenController from './app/controllers/DeliverymenController';
import DeliveriesController from './app/controllers/DeliveriesController';
import OrderController from './app/controllers/OrderController';

// Middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionsController.store);

routes.post('/files', upload.single('file'), FilesController.store);

routes.get('/deliverymen/:id', DeliverymenController.show);
routes.get('/deliverymen/:id/deliveries', OrderController.index);
routes.get('/deliverymen/:id/delivered', OrderController.index);
routes.post('/deliverymen/:id/deliveries/:deliveryId', OrderController.store);
routes.put('/deliverymen/:id/deliveries/:deliveryId', upload.single('file'), OrderController.update);

routes.use(authMiddleware);

routes.get('/recipients', RecipientsController.index);
routes.post('/recipients', RecipientsController.store);
routes.put('/recipients/:id', RecipientsController.update);
routes.delete('/recipients/:id', RecipientsController.delete);

routes.get('/deliverymen', DeliverymenController.index);
routes.post('/deliverymen', DeliverymenController.store);
routes.put('/deliverymen/:id', DeliverymenController.update);
routes.delete('/deliverymen/:id', DeliverymenController.delete);

routes.get('/deliveries', DeliveriesController.index);
routes.post('/deliveries', DeliveriesController.store);
routes.put('/deliveries/:id', DeliveriesController.update);
routes.delete('/deliveries/:id', DeliveriesController.delete);

export default routes;
