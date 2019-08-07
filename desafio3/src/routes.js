import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';

import multerConfig from './config/multer';
import FileController from './app/controllers/FileController';

const routes = new Router();

const upload = multer(multerConfig);

// não logado
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

// logado
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
