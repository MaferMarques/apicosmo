import { getRepository, Repository } from 'typeorm';

import ICreateLikeDTO from '@modules/publications/dtos/ICreateLikeDTO';
import ILikesRepository from '@modules/publications/repositories/ILikesRepository';

import Like from '../entities/Like';

class LikesRepository implements ILikesRepository {
  private ormRepository: Repository<Like>;

  constructor() {
    this.ormRepository = getRepository(Like);
  }

  public async create({ post_id, user_id }: ICreateLikeDTO): Promise<Like> {
    const like = this.ormRepository.create({ post_id, user_id });

    await this.ormRepository.save(like);

    return like;
  }

  public async delete(user_id: string, post_id: string): Promise<void> {
    await this.ormRepository.delete({ user_id, post_id });
  }

  public async findByPostIdAndUserId(
    user_id: string,
    post_id: string,
  ): Promise<Like | undefined> {
    const foundLike = this.ormRepository.findOne({
      where: { user_id, post_id },
    });

    return foundLike;
  }
}

export default LikesRepository;
