import ILikesRepository from '@modules/publications/repositories/ILikesRepository';
import ICreateLikeDTO from '@modules/publications/dtos/ICreateLikeDTO';

import Like from '@modules/publications/infra/typeorm/entities/Like';

import { uuid } from 'uuidv4';

class FakeUsersRepository implements ILikesRepository {
  private likes: Like[] = [];

  public async create({ post_id, user_id }: ICreateLikeDTO): Promise<Like> {
    const like = new Like();

    like.id = uuid();
    like.user_id = user_id;
    like.post_id = post_id;

    this.likes.push(like);

    return like;
  }

  public async delete(user_id: string, post_id: string): Promise<void> {
    const findIndex = this.likes.findIndex(
      (like) => like.post_id === post_id && like.user_id === user_id,
    );

    this.likes.splice(findIndex, 1);
  }

  public async findByPostIdAndUserId(
    user_id: string,
    post_id: string,
  ): Promise<Like | undefined> {
    const findIndex = this.likes.findIndex(
      (like) => like.post_id === post_id && like.user_id === user_id,
    );

    const foundLike = this.likes[findIndex];

    return foundLike;
  }
}

export default FakeUsersRepository;
