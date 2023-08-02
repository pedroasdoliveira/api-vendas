import 'reflect-metadata';

import "express-async-errors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from 'cors';
import compression from "compression";
import express from 'express';
import { errors } from 'celebrate';

import './bootstrap';
import Errors from '@shared/middlewares/Errors';
import routes from './routes';
import '@shared/typeorm';

dotenv.config();
const app = express();

app.use(
  cors({
    credentials: true,
    origin: '*',
  }),
);
app.use(compression());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(routes);

app.use(errors())

app.use(Errors);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}!`);
});
