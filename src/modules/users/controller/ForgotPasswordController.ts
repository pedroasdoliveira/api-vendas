import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';

import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

interface IRequest {
  email: string;
}

export default class ForgotPasswordController {
  private _email: string;

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { email}: IRequest = req.body;
    this.email = email;

    try {
      const sendForgotPasswordEmail = new SendForgotPasswordEmailService()

      await sendForgotPasswordEmail.execute({
        email: this.email
      })

      return res.status(204).json({msg: 'E-mail de recuperação de senha enviado!'});
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
