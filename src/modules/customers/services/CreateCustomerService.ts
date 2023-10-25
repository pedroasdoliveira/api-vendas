import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public execute = async ({
    name,
    email,
  }: IRequest): Promise<Customer> => {
    const customersRepository = getCustomRepository(CustomersRepository);

    const emailExists = await customersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('O endereço de E-mail já está sendo utilizado');
    }

    const customer = customersRepository.create({
      name,
      email
    });

    await customersRepository.save(customer);

    return customer;
  };
}

export default CreateCustomerService;
