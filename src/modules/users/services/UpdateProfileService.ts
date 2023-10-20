import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public execute = async ({ userId, name, email, password, old_password}: IRequest): Promise<User> => {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado!', 400);
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user.id) {
      throw new AppError("Já existe um usuário com esse email!");
    }

    if (password && !old_password) {
      throw new AppError("A senha antiga é obrigatória!");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não corresponde!")
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  };
}

export default UpdateProfileService;
