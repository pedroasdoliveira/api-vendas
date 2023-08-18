import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';

import ResetPasswordService from '../services/ResetPasswordService';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordController {
  private _password: string;
  private _token: string;

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { password, token }: IRequest = req.body;
    this.password = password;
    this.token = token;

    try {
      const resetPassword = new ResetPasswordService();

      await resetPassword.execute({
        password: this.password,
        token: this.token,
      });

      return res.status(204).json();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json(error);
      } else {
        return res.status(500).json({
          msg: 'Error interno no servidor!',
          error: error,
        });
      }
    }
  };
}
