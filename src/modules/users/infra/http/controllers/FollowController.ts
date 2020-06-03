import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateFollowRelationService from '@modules/users/services/CreateFollowRelationService';
import DeleteFollowRelationService from '@modules/users/services/DeleteFollowRelationService';

export default class FollowController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const follower_id = request.user.id;

    const createFollowRelation = container.resolve(CreateFollowRelationService);

    const follow = await createFollowRelation.execute({
      user_id,
      follower_id,
    });

    return response.json(classToClass(follow));
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user_id } = request.params;
    const follower_id = request.user.id;

    const deleteFollowRelationService = container.resolve(
      DeleteFollowRelationService,
    );

    const unfollow = await deleteFollowRelationService.execute({
      user_id,
      follower_id,
    });

    return response.json(classToClass(unfollow));
  }
}
