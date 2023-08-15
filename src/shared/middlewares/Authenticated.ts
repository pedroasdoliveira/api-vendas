import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface TokenPayload extends JwtPayload {
  id: string;
  name: string
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token não foi especificado', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.secret);
    //console.log(decodedToken);

    const { sub } = decodedToken as TokenPayload;

    if (typeof sub !== 'string') {
      throw new AppError('Erro ao salvar o Id de identificação', 401);
    }

    req.user = {
      id: sub
    }

    return next();
  } catch (error) {
    throw new AppError('JWT Token invalido!', 401);
  }
}

export default isAuthenticated