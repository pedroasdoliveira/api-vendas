import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';

import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

interface IRequest {
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export default class ProfileController {

  private _name: string;
  private _email: string;
  private _password: string | undefined;
  private _old_password: string | undefined;

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string | undefined {
    return this._password;
  }

  get old_password(): string | undefined {
    return this._old_password;
  }

  set name(value: string) {
    this._name = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set password(value: string | undefined) {
    this._password = value;
  }

  set old_password(value: string | undefined) {
    this._old_password = value;
  }

  public show = async (req: Request, res: Response): Promise<Response> => {
    try {
      const showProfile = new ShowProfileService();
      const userId = req.user.id

      const user = await showProfile.execute({userId});

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

  public update = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user.id
    const { name, email, password, old_password }: IRequest = req.body;
    this.name = name;
    this.email = email;
    this.password = password;
    this.old_password = old_password;

    try {
      const updateProfile = new UpdateProfileService()

      const user = await updateProfile.execute({
        userId,
        name: this.name,
        email: this.email,
        password: this.password,
        old_password: this.old_password
      });

      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json(error);
      } else {
        return res.status(500).json({
          msg: 'Error interno no servidor ao atualizar informações!',
          error: error,
        });
      }
    }
  };
}
