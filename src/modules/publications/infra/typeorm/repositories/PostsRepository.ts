import { getRepository, Repository } from 'typeorm';

import ICreatePostDTO from '@modules/publications/dtos/ICreatePostDTO';
import IPostsRepository from '@modules/publications/repositories/IPostsRepository';

import Post from '../entities/Post';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async create({
    content,
    user_id,
    image,
  }: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create({ content, user_id, image });

    await this.ormRepository.save(post);

    return post;
  }

  public async findByID(id: string): Promise<Post | undefined> {
    const post = this.ormRepository.findOne(id);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    return this.ormRepository.save(post); // if already exists, only updates
  }

  public async findAll(): Promise<Post[] | undefined> {
    const posts = this.ormRepository.find();

    return posts;
  }

  public async findByUserID(id: string): Promise<Post[] | undefined> {
    const posts = await this.ormRepository.find({
      where: id,
    });

    return posts;
  }

  public async delete(post_id: string): Promise<void> {
    await this.ormRepository.delete(post_id);
  }
}

export default PostsRepository;
