import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import JwtTokenAccess from '@shared/helpers/token';

import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public execute = async ({
    email,
    password,
  }: IRequest): Promise<IResponse> => {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Usuário ou senha incorretos!', 401);
    }

    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed) {
      throw new AppError('Usuário ou senha incorretos!', 401);
    } 

    const jwtAccess = new JwtTokenAccess();
    
    const token = jwtAccess.createAccessToken(user);

    // const token = sign({}, '671ff328a17871b41a862cf83c6c215c', {
    //   subject: user.id,
    //   expiresIn: '1d',
    // });

    return { user, token };
  };
}

export default CreateSessionsService;
