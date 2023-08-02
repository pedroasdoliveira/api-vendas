import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUsersService';

interface IRequest {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export default class UsersController {
  // private createService: CreateUserService;
  // private listService: ListUserService;

  // constructor(
  //   createUserService: CreateUserService,
  //   listUserService: ListUserService,
  // ) {
  //   this.createService = createUserService;
  //   this.listService = listUserService;
  // }

  private _name: string;
  private _email: string;
  private _password: string;
  private _avatar: string;

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get avatar(): string {
    return this._avatar;
  }

  set name(value: string) {
    this._name = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set password(value: string) {
    this._password = value;
  }

  set avatar(value: string) {
    this._avatar = value;
  }

  public index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const listUsers = new ListUserService();

      const user = await listUsers.execute();

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

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password }: IRequest = req.body;
    this.name = name;
    this.email = email;
    this.password = password;

    try {
      const createUser = new CreateUserService()

      const user = await createUser.execute({
        name: this.name,
        email: this.email,
        password: this.password,
      });

      return res.status(201).json(user);
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
