import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
export class UserTokensRepository extends Repository<UserToken> {
  public findByToken = async (token: string): Promise<UserToken | undefined> => {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  };

  public generate = async (user_id: string): Promise<UserToken | undefined> => {
    const userToken = await this.create({
      user_id
    });

    await this.save(userToken);

    return userToken;
  };
}
