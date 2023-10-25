import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomerRepository';


class ListCustomerService {
  public execute = async (): Promise<Customer[]> => {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = await customersRepository.find();

    if (!customers) {
      throw new AppError(
        'Nenhum dado da entidade de Customers(Clientes) foi encontrado',
        500,
      );
    }

    return customers;
  };
}

export default ListCustomerService;
