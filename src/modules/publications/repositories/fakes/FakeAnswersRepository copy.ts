import ICommentsRepository from '@modules/publications/repositories/ICommentsRepository';
import ICreateCommentDTO from '@modules/publications/dtos/ICreateCommentDTO';

import Comment from '@modules/publications/infra/typeorm/entities/Comment';

import { uuid } from 'uuidv4';

class FakeAnswersRepository implements ICommentsRepository {
  private answers: Comment[] = [];

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

    this.answers.push(comment);

    return comment;
  }

  public async findByID(id: string): Promise<Comment | undefined> {
    const foundComment = this.comments.find((comment) => comment.id === id);

    return foundComment;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.comments.findIndex((comment) => comment.id === id);

    this.comments.splice(findIndex, 1);
  }

  public async findAllByPostID(
    post_id: string,
  ): Promise<Comment[] | undefined> {
    const foundComments = this.comments.filter(
      (comment) => comment.post_id === post_id,
    );

    return foundComments;
  }

  public async save(comment: Comment): Promise<Comment> {
    const findIndex = this.comments.findIndex(
      (foundPost) => foundPost.id === comment.id,
    );

    this.comments[findIndex] = comment;

    return comment;
  }
}

export default FakeAnswersRepository;
