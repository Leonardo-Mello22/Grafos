import { Response, Request } from 'express';
import { getRepository, Not, In } from 'typeorm';
import jwt from 'jsonwebtoken';

import Usuarios from '../../models/Usuarios';
import authConfig from '../../utils/authConfig';

const generetedToken = (usuario: Usuarios) => jwt.sign(
  {
    usuarioId: usuario.idusuarios,
    email: usuario.email,
  },
  authConfig.secret,
  {
    expiresIn: authConfig.expiresIn,
  },
);

const Login = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const conexao = getRepository(Usuarios);
    const { email, senha } = request.body;

    // Pesquisa um usuário com o email e senha passado
    const resposta = await conexao.findOne({
      select: [
        'idusuarios',
        'nome',
        'email',
      ],
      where : {
        email: email,
        senha: senha,
      }
    });

    if (!resposta) {
      return response
        .status(400)
        .json({ message: `Seu login não confere.`});
    }

    let LoginToken = resposta;
    // @ts-ignore - Gera um token toda vez que um login é feito.
    LoginToken.token = generetedToken(resposta);
    // @ts-ignore - Armazena o nome do usuário no Token
    LoginToken.first_name = resposta.nome;

    return response.json(LoginToken);
  } catch (error) {
    return response.status(400).json(error);
  }
};

export default Login;
