import ICreatePostDTO from '@modules/publications/dtos/ICreatePostDTO';
import Post from '../infra/typeorm/entities/Post';

export default interface IUsersRepository {
  create({ content, user_id }: ICreatePostDTO): Promise<Post>;
  save(post: Post): Promise<Post>;
  findAll(): Promise<Post[] | undefined>;
  findByID(id: string): Promise<Post | undefined>;
  findByUserID(id: string): Promise<Post[] | undefined>;
  delete(post_id: string): Promise<void>;
  findAllByFollowedUsersId(users_id: string[]): Promise<Post[] | undefined>;
}
