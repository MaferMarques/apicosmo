import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IFollowRepository from '../repositories/IFollowRepository';

import Follow from '../infra/typeorm/entities/Follow';

interface IRequest {
  user_id: string;
  follower_id: string;
}

@injectable()
class CreateCargoService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FollowRepository')
    private followRepository: IFollowRepository,
  ) {}

  public async execute({ user_id, follower_id }: IRequest): Promise<Follow> {
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

    if (foundFollow) {
      throw new AppError('You cannot follow a same user twice');
    }

    const follow = await this.followRepository.create(user_id, follower_id);

    foundUser.followers += 1;

    await this.usersRepository.save(foundUser);

    return follow;
  }
}

export default CreateCargoService;
