import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public execute = async ({
    name,
    email,
    password,
  }: IRequest): Promise<User> => {
    const usersRepository = getCustomRepository(UserRepository);

    const emailExists = await usersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('O endereço de E-mail já está sendo utilizado');
    }

    const hashPassword = await hash(password, 8);

    const user = await usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await usersRepository.save(user);

    return user;
  };
}

export default CreateUserService;
