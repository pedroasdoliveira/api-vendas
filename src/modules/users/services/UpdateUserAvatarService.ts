import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import uploadConfig from "@config/upload";

interface IRequest {
  user_id: string;
  avatarFilename: string | undefined;
}

class UpdateUserAvatarService {
  public execute = async ({user_id, avatarFilename}: IRequest): Promise<User> => {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado!');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    if (typeof avatarFilename !== 'string') {
      throw new AppError('Não foi possível carregar o arquivo escolhido!');
    }

    user.avatar = avatarFilename;
    
    await usersRepository.save(user);

    return user;
  };
}

export default UpdateUserAvatarService;
