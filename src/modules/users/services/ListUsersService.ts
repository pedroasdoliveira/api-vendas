import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

class ListUserService {
  public execute = async (): Promise<User[]> => {
    const usersRepository = getCustomRepository(UserRepository);

    const users = await usersRepository.find();

    if (!users) {
      throw new AppError(
        'Nenhum dado da entidade de Users foi encontrado',
        500,
      );
    }

    return users;
  };
}

export default ListUserService;
