import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IFollowRepository from '../repositories/IFollowRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
  follower_id: string;
}

@injectable()
class DeleteFollowRelationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,

    @inject('FollowRepository')
    private followRepository: IFollowRepository,
  ) {}

  public async execute({ user_id, follower_id }: IRequest): Promise<void> {
    const foundFollower = await this.usersRepository.findById(follower_id);

    if (!foundFollower) {
      throw new AppError('Not allowed');
    }

    const foundUser = await this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('User not found');
    }

    const foundFollow = await this.followRepository.findByUserIdAndFollowerId(
      user_id,
      follower_id,
    );

    if (!foundFollow) {
      throw new AppError('Relation not found');
    }

    await this.followRepository.delete(foundFollow);

    foundUser.followers -= 1;

    await this.usersRepository.save(foundUser);
  }
}

export default DeleteFollowRelationService;
