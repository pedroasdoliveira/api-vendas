import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import ListCustomerService from '../services/ListCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import CreateCustomerService from '../services/CreateCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';

interface IRequest {
  name: string;
  email: string;
}

export default class CustomersController {
  private _name: string;
  private _email: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  public index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const listCustomer = new ListCustomerService();

      const customers = await listCustomer.execute();

      return res.status(200).json(customers);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json(error)
      } else {
        return res
        .status(500)
        .json({ msg: 'Error interno no servidor ao pegar informações!', error: error });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const showCustomer = new ShowCustomerService();

      const customer = await showCustomer.execute({ id });

      return res.status(200).json(customer);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json(error)
      } else {
        return res
        .status(500)
        .json({ msg: 'Error interno no servidor ao pegar a informação!', error: error });
      }
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { name, email }: IRequest = req.body;
    this.name = name;
    this.email = email;

    try {
      const createCustomer = new CreateCustomerService();

      const customer = await createCustomer.execute({
        name: this.name,
        email: this.email
      });

      return res.status(201).json(customer);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json(error)
      } else {
        return res
        .status(500)
        .json({ msg: 'Error interno no servidor ao criar informações!', error: error });
      }
    }
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { name, email }: IRequest = req.body;
    this.name = name;
    this.email = email

    try {
      const updateCustomer = new UpdateCustomerService();

      const customer = await updateCustomer.execute({
        id,
        name: this.name,
        email: this.email
      });

      return res.status(200).json(customer);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json(error)
      } else {
        return res
        .status(500)
        .json({ msg: 'Error interno no servidor ao atualizar informações!', error: error });
      }
    }
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const deleteCustomer = new DeleteCustomerService();

      await deleteCustomer.execute({id});

      return res.status(204).json([]);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json(error)
      } else {
        return res
        .status(500)
        .json({ msg: 'Error interno no servidor ao deletar informações!', error: error });
      }
    }
  }
}
