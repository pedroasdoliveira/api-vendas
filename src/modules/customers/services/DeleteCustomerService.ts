import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import { CustomersRepository } from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public execute = async ({ id }: IRequest): Promise<void> => {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Cliente não encontrado!', 400);
    }

    await customersRepository.remove(customer);
  };
}

export default DeleteCustomerService;
