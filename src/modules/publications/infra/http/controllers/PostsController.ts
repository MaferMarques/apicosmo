import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePostService from '@modules/publications/services/CreatePostService';
import ListPostsService from '@modules/publications/services/ListPostsService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { content } = request.body;
    const image = request.file?.filename;

    const createPost = container.resolve(CreatePostService);

    const post = await createPost.execute({
      content,
      user_id,
      image,
    });

    return response.json(classToClass(post));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listPosts = container.resolve(ListPostsService);

    const posts = await listPosts.execute({
      user_id,
    });

    return response.json(posts);
  }
}
