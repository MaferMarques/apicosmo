import ICreateLikeDTO from '../dtos/ICreateLikeDTO';

import Like from '../infra/typeorm/entities/Like';

export default interface ILikesRepository {
  create({ user_id, post_id }: ICreateLikeDTO): Promise<Like>;
  delete(user_id: string, post_id: string): Promise<void>;
  findByPostIdAndUserId(
    user_id: string,
    post_id: string,
  ): Promise<Like | undefined>;
}
