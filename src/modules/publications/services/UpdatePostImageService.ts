// import path from 'path';
// import fs from 'fs';
// import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IPostsRepository from '../repositories/IPostsRepository';

import Post from '../infra/typeorm/entities/Post';

interface IRequest {
  post_id: string;
  postFilename: string;
}

@injectable()
class UpdatePostImageService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ post_id, postFilename }: IRequest): Promise<Post> {
    const post = await this.postsRepository.findByID(post_id);

    if (!post) {
      throw new AppError('Post not found.', 400);
    }

    if (post.image) {
      await this.storageProvider.deleteFile(post.image);
    }

    const filename = await this.storageProvider.saveFile(postFilename);

    post.image = filename;

    await this.postsRepository.save(post); // just updates the post;

    return post;
  }
}

export default UpdatePostImageService;
