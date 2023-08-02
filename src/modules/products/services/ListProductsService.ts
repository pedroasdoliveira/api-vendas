import { getCustomRepository } from 'typeorm';

import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const products = await productsRepository.find();

    if (!products) {
      throw new AppError("Nenhum dado da entidade Products foi encontrado", 500);
    }

    return products;
  }
}

export default ListProductService;
