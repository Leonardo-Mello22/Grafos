/* eslint-disable import/no-extraneous-dependencies */
import { Router } from 'express';

import LoginServices from '../services/Login';

const loginRotas = Router();

loginRotas.post('/', LoginServices);

export default loginRotas;
