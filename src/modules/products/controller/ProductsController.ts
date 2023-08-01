import { Request, Response } from 'express';
import ListProductService from '../services/ListProductsService';
import AppError from '@shared/errors/AppError';
import ShowProductService from '../services/ShowProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

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
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Error interno no servidor ao puxar informações!' });
    }
  };

  public show = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const showProduct = new ShowProductService();

      const product = await showProduct.execute({ id });

      return res.status(200).json(product);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Error interno no servidor ao puxar informações!' });
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
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Error interno no servidor ao criar informações!' });
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
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Error interno no servidor ao atualizar informações!' });
    }
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const deleteProduct = new DeleteProductService();

      await deleteProduct.execute({id});

      return res.status(204).json([]);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Error interno no servidor ao deletar informações!' });
    }
  }
}
