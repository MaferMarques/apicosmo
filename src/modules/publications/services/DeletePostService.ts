import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IPostsRepository from '../repositories/IPostsRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  post_id: string;
  user_id: string;
}

@injectable()
class DeleteLikeService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ post_id, user_id }: IRequest): Promise<void> {
    const foundUser = await this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('User not found.');
    }

    const foundPost = await this.postsRepository.findByID(post_id);

    if (!foundPost) {
      throw new AppError('Post not found');
    }

    if (foundPost.user_id !== user_id) {
      throw new AppError('Not Allowed');
    }

    await this.postsRepository.delete(post_id);
  }
}

export default DeleteLikeService;
