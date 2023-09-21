import { getCustomRepository } from 'typeorm';
import path from 'path';

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

    const { token } = await tokenRepository.generate(user.id);
    console.log('Token: %s', token);

    const forgotPasswordTemplate = path.resolve(__dirname, "..", "views", "forgot_password.hbs");

    await EtherialMail.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: "E-mail de recuperação de senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`
        }
      }
    })
  };
}

export default SendForgotPasswordEmailService;
