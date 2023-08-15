import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate'; // Lib para validação de dados de Requisição

import UsersController from '../controller/UsersController';
import isAuthenticated from '@shared/middlewares/Authenticated';

const usersRouter = Router();

const userController = new UsersController();

usersRouter.get('/', isAuthenticated ,userController.index);

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

export default usersRouter;
