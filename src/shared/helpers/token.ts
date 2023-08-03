import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import User from '@modules/users/typeorm/entities/User';

export default class JwtTokenAccess {
  public createAccessToken = (user: User) => {
    const { secret, expiresIn } = authConfig;

    return sign({ id: user.id, name: user.name }, secret, {
      subject: user.id,
      expiresIn,
    });
  };
}
