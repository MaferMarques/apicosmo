import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IPostsRepository from '../repositories/IPostsRepository';
import ICommentsRepository from '../repositories/ICommentsRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Comment from '../infra/typeorm/entities/Comment';

interface IRequest {
  content: string;
  user_id: string;
  post_id: string;
}

@injectable()
class CreateCommentService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    content,
    user_id,
    post_id,
  }: IRequest): Promise<Comment> {
    const foundUser = await this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('User not found.');
    }

    const post = await this.commentsRepository.create({
      post_id,
      content,
      user_id: foundUser.id,
    });

    return post;
  }
}

export default CreateCommentService;
