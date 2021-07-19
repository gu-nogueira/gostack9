// Aqui importamos somente o item Router do express, e não o express inteiro
import { Router } from 'express';

// Importando configurações do multer
import multer from 'multer';
import multerConfig from './config/multer';

// Agora vamos importar os controllers para manipular os models
import UsersController from './app/controllers/UsersController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

// Importando os Middlewares
import authMiddleware from './app/middlewares/auth';

// Instancia o item Router do express (inicia) e armazena na const routes
const routes = new Router();
// Vamos iniciar o multer com uma variável upload
const upload = multer(multerConfig);

// Aqui, podemos utilizar as rotas da mesma forma que utilizávamos no modulo 01 com server.get

// Aqui, fazemos um POST para UsersControllers, utilizando o método que foi importado de lá '.store'
routes.post('/users', UsersController.store);
routes.post('/sessions', SessionController.store);

/** Podemos definir o middleware como um middleware global, ou definir localmente na rota desejada com vírgula, como vimos anteriormente
 * Como middleware global, tudo que vier de rota abaixo de .use(authMiddleware) passará pelo middleware de autenticação */
routes.use(authMiddleware);

routes.put('/users', /**Posso passar o middleware localmente aqui: authMiddleware, */ UsersController.update);

// Criando nova rota para providers
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
