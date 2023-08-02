import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';

import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductsService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class ProductsController {
  private _name: string;
  private _price: number;
  private _quantity: number;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  public index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const listProducts = new ListProductService();

      const products = await listProducts.execute();

      return res.status(200).json(products);
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
      const showProduct = new ShowProductService();

      const product = await showProduct.execute({ id });

      return res.status(200).json(product);
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
    const { name, price, quantity }: IRequest = req.body;
    this.name = name;
    this.price = price;
    this.quantity = quantity;

    try {
      const createProduct = new CreateProductService();

      const product = await createProduct.execute({
        name: this.name,
        price: this.price,
        quantity: this.quantity,
      });

      return res.status(201).json(product);
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
    const { name, price, quantity }: IRequest = req.body;
    this.name = name;
    this.price = price;
    this.quantity = quantity;

    try {
      const updateProduct = new UpdateProductService();

      const product = await updateProduct.execute({
        id,
        name: this.name,
        price: this.price,
        quantity: this.quantity,
      });

      return res.status(200).json(product);
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
      const deleteProduct = new DeleteProductService();

      await deleteProduct.execute({id});

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
