import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateLikeService from '@modules/publications/services/CreateLikeService';
import DeleteLikeService from '@modules/publications/services/DeleteLikeService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { post_id } = request.params;

    const createLike = container.resolve(CreateLikeService);

    const like = await createLike.execute({
      post_id,
      user_id,
    });

    return response.json(classToClass(like));
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { post_id } = request.params;

    const deleteLike = container.resolve(DeleteLikeService);

    await deleteLike.execute({
      post_id,
      user_id,
    });

    return response.json().send();
  }
}
