import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs'

import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public execute = async ({ token, password }: IRequest): Promise<void> => {
    const usersRepository = getCustomRepository(UserRepository);
    const tokenRepository = getCustomRepository(UserTokensRepository);
    
    const userToken = await tokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('O token de usuário não existe!');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('O usuário não existe!');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado!');
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  };
}

export default ResetPasswordService;
