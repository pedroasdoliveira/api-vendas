import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate'; // Lib para validação de dados de Requisição

import UsersController from '../controller/UsersController';

const usersRouter = Router();

const userController = new UsersController();

usersRouter.get('/', userController.index);

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
