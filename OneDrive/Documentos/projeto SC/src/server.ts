import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import 'express-async-errors';

import routes from './routes';
import AppError from './errors/AppError';
import middleware from './middleware';

import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(json());
app.use(middleware);
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Erro na sua requisição 🤯',
  });
});

app.listen(3025, () => {
  console.log('🤖 A sua Startup está funcionando, bora pra cima? @janleysoares! 🤖');
});
export { app };
