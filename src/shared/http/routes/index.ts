import { Router } from "express";

import usersRouter from "@modules/users/routes/users.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import productsRouter from "@modules/products/routes/products.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import customersRouter from "@modules/customers/routes/customers.routes";

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/auths', sessionsRouter);

routes.use('/password', passwordRouter);

routes.use('/products', productsRouter);

routes.use('/profile', profileRouter);

routes.use("/customers", customersRouter);

export default routes;