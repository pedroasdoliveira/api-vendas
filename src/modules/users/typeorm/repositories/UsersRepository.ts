import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public findByName = async (name: string): Promise<User | undefined> => {
    const user = await this.findOne({
      where: {
        name,
      },
    });

    return user;
  };

  public findById = async (id: string): Promise<User | undefined> => {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  };

  public findByEmail = async (email: string): Promise<User | undefined> => {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  };
}
