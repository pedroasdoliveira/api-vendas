import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token não foi especificado', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    verify(token, authConfig.secret);

    return next();
  } catch (error) {
    throw new AppError('JWT Token invalido!', 401);
  }
}

export default isAuthenticated