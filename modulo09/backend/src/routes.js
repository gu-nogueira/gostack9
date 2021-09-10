// Aqui importamos somente o item Router do express, e não o express inteiro
import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UsersController from './app/controllers/UsersController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UsersController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UsersController.update);

routes.get('/providers', ProviderController.index);

// Vamos criar uma rota para capturar todos os horários disponíveis para um determinado provider (prestador de serviço)
routes.get('/providers/:providerId/available', AvailableController.index);
// Importante lembrar, sempre que criarmos um novo método no controller, devemos lembrar que o mesmo precisará de uma rota de saída
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
// Recebemos o id da requisição que será cancelada
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
// Rota de atualização da notificação
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

// Exporta o routes para app.js
export default routes;
