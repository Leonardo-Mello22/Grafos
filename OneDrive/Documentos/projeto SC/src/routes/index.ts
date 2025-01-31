/* eslint-disable import/no-extraneous-dependencies */
import { Router } from 'express';
import useragent from 'express-useragent';

import login from './login.routes';

const routes = Router();
// @ts-ignore
routes.use(useragent.express());

routes.use('/login', login);

export default routes;
