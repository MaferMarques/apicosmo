import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListPostsByFollowedUsersService from '@modules/publications/services/ListPostsByFollowedUsersService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listPosts = container.resolve(ListPostsByFollowedUsersService);

    const posts = await listPosts.execute({
      user_id,
    });

    return response.json(classToClass(posts));
  }
}
