import { Router } from "express";

import usersRouter from "@modules/users/routes/users.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import productsRouter from "@modules/products/routes/products.routes";
import passwordRouter from "@modules/users/routes/password.routes";

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/auths', sessionsRouter);

routes.use('/password', passwordRouter);

routes.use('/products', productsRouter);

export default routes;