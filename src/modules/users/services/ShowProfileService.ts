import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  userId: string;
}

class ShowProfileService {
  public execute = async ({ userId }: IRequest): Promise<User> => {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado!', 400);
    }

    return user;
  };
}

export default ShowProfileService;
