import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import authConfig from './utils/authConfig';

const acessoSemLogin = (url: string) => {

  switch (url) {
    case '/login':
      return true;
    default:
      return false;
  }
};

const middleware = (req: Request, res: Response, next: NextFunction): void => {
  if (acessoSemLogin(req.path)) {
    next();
    return;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send({ message: 'Você não está logado no sistema' });
    return;
  }

  // Bearer lkasdjfksdfaDJKÇLÇLKASDA
  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    res.status(401).send({ message: 'Token error' });
    return;
  }

  const [schema, token] = parts;

  // Verifica se Schema tem a palavra Bearer
  if (!/^Bearer$/i.test(schema)) {
    res.status(401).send({ message: 'Token mal formado' });
    return;
  }

  // verifica token
  jwt.verify(token, authConfig.secret, (err: VerifyErrors | null, decoded: any): void => {
    if (err) {
      res.status(401).send({ message: 'Token invalido' });
      return;
    }
    // @ts-ignore: Unreachable code error
    req.idusuarios = decoded.usuarioId;
    // @ts-ignore: Unreachable code error
    req.email = decoded.email;
    next();
  });
};

export default middleware;
