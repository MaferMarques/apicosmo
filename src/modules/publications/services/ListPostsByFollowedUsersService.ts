import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFollowRepository from '@modules/users/repositories/IFollowRepository';
import IPostsRepository from '../repositories/IPostsRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Post from '../infra/typeorm/entities/Post';

interface IRequest {
  user_id: string;
}

@injectable()
class ListPostsByFollowedUsersService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FollowRepository')
    private followRepository: IFollowRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Post[] | undefined> {
    const foundUser = await this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('User not found.');
    }

    const posts = await this.postsRepository.findAllByFollowedUsers();

    return posts;
  }
}

export default ListPostsByFollowedUsersService;
