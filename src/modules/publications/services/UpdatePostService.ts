import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IPostsRepository from '../repositories/IPostsRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Post from '../infra/typeorm/entities/Post';

interface IRequest {
  content: string;
  user_id: string;
  post_id: string;
}

@injectable()
class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ content, user_id, post_id }: IRequest): Promise<Post> {
    const foundUser = await this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('User not found.');
    }

    const foundPost = await this.postsRepository.findByID(post_id);

    if (!foundPost) {
      throw new AppError('Post not found');
    }

    foundPost.content = content;

    const post = await this.postsRepository.save(foundPost);

    return post;
  }
}

export default UpdatePostService;
