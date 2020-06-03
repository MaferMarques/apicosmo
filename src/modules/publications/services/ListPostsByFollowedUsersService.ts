import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFollowRepository from '@modules/users/repositories/IFollowRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPostsRepository from '../repositories/IPostsRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Post from '../infra/typeorm/entities/Post';

interface IRequest {
  user_id: string;
}

@injectable()
class ListPostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('FollowRepository')
    private followRepository: IFollowRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Post[] | undefined> {
    const foundUser = await this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('User not found.');
    }

    const followedUsersIds = await this.followRepository.findIDs(user_id);

    if (!followedUsersIds) {
      return undefined;
    }

    const foundPosts = followedUsersIds.map((id) =>
      this.postsRepository.findByUserID(id),
    );

    return foundPosts;
  }
}

export default ListPostsService;
