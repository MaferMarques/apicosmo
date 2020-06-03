import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IPostsRepository from '../repositories/IPostsRepository';
import ILikesRepository from '../repositories/ILikesRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Like from '../infra/typeorm/entities/Like';

interface IRequest {
  post_id: string;
  user_id: string;
}

@injectable()
class CreateLikeService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('LikesRepository')
    private likesRepository: ILikesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ post_id, user_id }: IRequest): Promise<Like> {
    const foundUser = await this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('User not found.');
    }

    const foundPost = await this.postsRepository.findByID(post_id);

    if (!foundPost) {
      throw new AppError('Post not found');
    }

    const foundLike = await this.likesRepository.findByPostIdAndUserId(
      user_id,
      post_id,
    );

    if (foundLike) {
      throw new AppError('Not allowed');
    }

    const like = await this.likesRepository.create({
      post_id,
      user_id,
    });

    foundPost.likes += 1;

    await this.postsRepository.save(foundPost);

    return like;
  }
}

export default CreateLikeService;
