import { getRepository, Repository } from 'typeorm';

import IFollowRepository from '@modules/users/repositories/IFollowRepository';

import Follow from '../entities/Follow';

class FollowRepository implements IFollowRepository {
  private ormRepository: Repository<Follow>;

  constructor() {
    this.ormRepository = getRepository(Follow);
  }

  public async create(user_id: string, follower_id: string): Promise<Follow> {
    const follow = this.ormRepository.create({ user_id, follower_id });

    await this.ormRepository.save(follow);

    return follow;
  }

  public async findByUserIdAndFollowerId(
    user_id: string,
    follower_id: string,
  ): Promise<Follow | undefined> {
    const foundFollow = await this.ormRepository.findOne({
      where: { user_id, follower_id },
    });

    return foundFollow;
  }

  public async delete(foundFollow: Follow): Promise<void> {
    const { user_id, follower_id } = foundFollow;

    await this.ormRepository.delete({ user_id, follower_id });
  }
}

export default FollowRepository;
