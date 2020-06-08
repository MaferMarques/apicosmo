import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePostService from '@modules/publications/services/CreatePostService';
import UpdatePostService from '@modules/publications/services/UpdatePostService';
import ListPostsService from '@modules/publications/services/ListPostsService';
import DeletePostService from '@modules/publications/services/DeletePostService';

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

    return response.json(classToClass(posts));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { content } = request.body;
    const { post_id } = request.params;

    const updatePost = container.resolve(UpdatePostService);

    const post = await updatePost.execute({
      content,
      user_id,
      post_id,
    });

    return response.json(classToClass(post));
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { post_id } = request.params;

    const deletePost = container.resolve(DeletePostService);

    await deletePost.execute({
      user_id,
      post_id,
    });

    return response.json().send();
  }
}
