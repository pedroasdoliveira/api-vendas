import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer> {
  public findByName = async (name: string): Promise<Customer | undefined> => {
    const customer = await this.findOne({
      where: {
        name,
      },
    });

    return customer;
  };

  public findById = async (id: string): Promise<Customer | undefined> => {
    const customer = await this.findOne({
      where: {
        id,
      },
    });

    return customer;
  };

  public findByEmail = async (email: string): Promise<Customer | undefined> => {
    const customer = await this.findOne({
      where: {
        email,
      },
    });

    return customer;
  };
}
