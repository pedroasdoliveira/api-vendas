import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public execute = async ({ email }: IRequest): Promise<void> => {
    const usersRepository = getCustomRepository(UserRepository);
    const tokenRepository = getCustomRepository(UserTokensRepository);
    
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário com o e-mail passado não existe!');
    }

    const token = await tokenRepository.generate(user.id);
    console.log('Token: ');
    console.log(token);
  };
}

export default SendForgotPasswordEmailService;
