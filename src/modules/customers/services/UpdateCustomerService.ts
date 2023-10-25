import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public execute = async ({ id, name, email}: IRequest): Promise<Customer> => {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Cliente não encontrado!', 400);
    }

    const customerExists = await customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError("Já existe um cliente com esse email!");
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  };
}

export default UpdateCustomerService;
