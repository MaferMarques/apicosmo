import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IPostsRepository from '../repositories/IPostsRepository';
import ICommentsRepository from '../repositories/ICommentsRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
  post_id: string;
  comment_id: string;
}

@injectable()
class DeleteCommentService {
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
    comment_id,
  }: IRequest): Promise<void> {
    const foundUser = await this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('User not found.');
    }

    const foundPost = await this.postsRepository.findByID(post_id);

    if (!foundPost) {
      throw new AppError('Post not found');
    }

    const foundComment = await this.commentsRepository.findByID(comment_id);

    if (!foundComment) {
      throw new AppError('Comment not found');
    }

    if (foundComment.user_id !== user_id) {
      throw new AppError('Not allowed!');
    }

    foundPost.comments -= 1;

    await this.postsRepository.save(foundPost);

    await this.commentsRepository.delete(comment_id);
  }
}

export default DeleteCommentService;
