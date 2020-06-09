import { getRepository, Repository } from 'typeorm';

import ICreateCommentDTO from '@modules/publications/dtos/ICreateCommentDTO';
import ICommentsRepository from '@modules/publications/repositories/ICommentsRepository';

import Comment from '../entities/Comment';

class CommentsRepository implements ICommentsRepository {
  private ormRepository: Repository<Comment>;

  constructor() {
    this.ormRepository = getRepository(Comment);
  }

  public async create({
    content,
    user_id,
    post_id,
    type,
  }: ICreateCommentDTO): Promise<Comment> {
    const comment = this.ormRepository.create({
      content,
      user_id,
      post_id,
      type,
    });

    await this.ormRepository.save(comment);

    return comment;
  }

  public async findByID(id: string): Promise<Comment | undefined> {
    const comment = this.ormRepository.findOne(id);

    return comment;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default CommentsRepository;
