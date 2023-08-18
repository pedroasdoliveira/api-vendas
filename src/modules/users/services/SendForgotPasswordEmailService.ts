import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import AppError from '@shared/errors/AppError';
import EtherialMail from '@config/mail/EtherialMail';

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
    console.log('Token: %s', token);

    await EtherialMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida: ${token?.token}`,
      subject: "E-mail de recuperação de senha"
    })
  };
}

export default SendForgotPasswordEmailService;
