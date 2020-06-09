import ICommentsRepository from '@modules/publications/repositories/ICommentsRepository';
import ICreateCommentDTO from '@modules/publications/dtos/ICreateCommentDTO';

import Comment from '@modules/publications/infra/typeorm/entities/Comment';

import { uuid } from 'uuidv4';

class FakeCommentsRepository implements ICommentsRepository {
  private comments: Comment[] = [];

  public async create({
    content,
    user_id,
    post_id,
    type,
  }: ICreateCommentDTO): Promise<Comment> {
    const comment = new Comment();

    comment.content = content;
    comment.id = uuid();
    comment.user_id = user_id;
    comment.post_id = post_id;
    comment.type = type;

    this.comments.push(comment);

    return comment;
  }
}

export default FakeCommentsRepository;
