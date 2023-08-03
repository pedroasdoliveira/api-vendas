import { Router } from "express";

import usersRouter from "@modules/users/routes/users.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import productsRouter from "@modules/products/routes/products.routes";

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/auths', sessionsRouter);

routes.use('/products', productsRouter);

export default routes;