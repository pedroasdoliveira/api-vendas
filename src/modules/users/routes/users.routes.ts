import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate'; // Lib para validação de dados de Requisição
import multer from 'multer';

import UsersController from '../controller/UsersController';
import isAuthenticated from '@shared/middlewares/Authenticated';
import uploadConfig from '@config/upload';

const usersRouter = Router();

const userController = new UsersController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, userController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userController.UpdateAvatar,
);

export default usersRouter;
