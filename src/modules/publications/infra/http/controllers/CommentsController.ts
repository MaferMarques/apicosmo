import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCommentService from '@modules/publications/services/CreateCommentService';

export default class CommentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { post_id } = request.params;
    const { content } = request.body;

    const createComment = container.resolve(CreateCommentService);

    const comment = await createComment.execute({
      content,
      user_id,
      post_id,
    });

    return response.json(classToClass(comment));
  }
}
