import 'reflect-metadata';

import "express-async-errors";
import cors from 'cors';
import express from 'express';
import { errors } from 'celebrate';

import Errors from '@shared/middlewares/Errors';
import routes from './routes';
import '@shared/typeorm';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: '*',
  }),
);
app.use(express.json());

app.use(routes);

app.use(errors())

app.use(Errors);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}!`);
});
