import IFollowRepository from '@modules/users/repositories/IFollowRepository';

import Follow from '@modules/users/infra/typeorm/entities/Follow';

import { uuid } from 'uuidv4';

class FakeFollowRepository implements IFollowRepository {
  private follows: Follow[] = [];

  public async create(user_id: string, follower_id: string): Promise<Follow> {
    const follow = new Follow();

    Object.assign(follow, { id: uuid(), user_id, follower_id });

    this.follows.push(follow);

    return follow;
  }

  public async findByUserIdAndFollowerId(
    user_id: string,
    follower_id: string,
  ): Promise<Follow | undefined> {
    const findIndex = this.follows.findIndex(
      (follow) =>
        follow.user_id === user_id && follow.follower_id === follower_id,
    );

    const foundLike = this.follows[findIndex];

    return foundLike;
  }

  public async delete(foundFollow: Follow): Promise<void> {
    const findIndex = this.follows.findIndex(
      (follow) => follow === foundFollow,
    );

    this.follows.splice(findIndex, 1);
  }

  public async findFollowedUsersIdByFollowerId(
    follower_id: string,
  ): Promise<string[] | undefined> {
    const filteredFollows = this.follows.filter(
      (follow) => follow.follower_id === follower_id,
    );

    const foundIds = filteredFollows.map((follow) => follow.user_id);

    return foundIds;
  }
}

export default FakeFollowRepository;
