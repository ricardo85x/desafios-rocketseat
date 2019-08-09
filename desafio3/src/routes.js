import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';

import multerConfig from './config/multer';
import FileController from './app/controllers/FileController';

import MeetUpController from './app/controllers/MeetupController';

import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();

const upload = multer(multerConfig);

// não logado
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

// logado
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/meetups', MeetUpController.store);
routes.put('/meetups/:id', MeetUpController.update);

routes.get('/meetups', MeetUpController.index);

routes.get('/meetups-filter', MeetUpController.indexFilter);
routes.get('/meetups-user', MeetUpController.indexUser);

routes.delete('/meetups/:id', MeetUpController.delete);

routes.post('/subscriptions', SubscriptionController.store);

export default routes;
