import ICreateCommentDTO from '@modules/publications/dtos/ICreateCommentDTO';
import Comment from '../infra/typeorm/entities/Comment';

export default interface IAnswersRepository {
  create({
    content,
    user_id,
    type,
    post_id,
  }: ICreateCommentDTO): Promise<Comment>;
  findByID(comment_id: string): Promise<Comment | undefined>;
  delete(post_id: string): Promise<void>;
  findAllByPostID(post_id: string): Promise<Comment[] | undefined>;
  save(comment: Comment): Promise<Comment>;
}
