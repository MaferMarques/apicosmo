import Follow from '../infra/typeorm/entities/Follow';

export default interface IFollowRepository {
  create(user_id: string, follower_id: string): Promise<Follow>;
  findByUserIdAndFollowerId(
    user_id: string,
    follower_id: string,
  ): Promise<Follow | undefined>;
  delete(follow: Follow): Promise<void>;
  findFollowedUsersIdByFollowerId(
    follower_id: string,
  ): Promise<string[] | undefined>;
}
