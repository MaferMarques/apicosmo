import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IPostsRepository from '../repositories/IPostsRepository';
import ICommentsRepository from '../repositories/ICommentsRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Comment from '../infra/typeorm/entities/Comment';

interface IRequest {
  user_id: string;
  post_id: string;
}

@injectable()
class ListCommentsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    post_id,
  }: IRequest): Promise<Comment[] | undefined> {
    const foundUser = await this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('User not found.');
    }

    const foundPost = await this.postsRepository.findByID(post_id);

    if (!foundPost) {
      throw new AppError('Post not found');
    }

    const foundPostComments = await this.commentsRepository.findAllByPostID(
      post_id,
    );

    return foundPostComments;
  }
}

export default ListCommentsService;
