import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

interface IRequest {
  email: string;
  password: string;
}

export default class SessionsController {
  private _email: string;
  private _password: string;

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  set email(value: string) {
    this._email = value;
  }

  set password(value: string) {
    this._password = value;
  }

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { email, password }: IRequest = req.body;
    this.email = email;
    this.password = password;

    try {
      const createSessions = new CreateSessionsService();

      const user = await createSessions.execute({
        email: this.email,
        password: this.password,
      });

      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json(error);
      } else {
        return res.status(500).json({
          msg: 'Error interno no servidor ao pegar informações!',
          error: error,
        });
      }
    }
  };
}
