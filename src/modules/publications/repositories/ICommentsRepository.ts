import ICreateCommentDTO from '@modules/publications/dtos/ICreateCommentDTO';
import Comment from '../infra/typeorm/entities/Comment';

export default interface ICommentsRepository {
  create({
    content,
    user_id,
    type,
    post_id,
  }: ICreateCommentDTO): Promise<Comment>;
}
