import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCommentService from '@modules/publications/services/CreateCommentService';
import DeleteCommentService from '@modules/publications/services/DeleteCommentService';
import ListPostCommentsService from '@modules/publications/services/ListPostCommentsService';

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

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { post_id } = request.params;

    const listComments = container.resolve(ListPostCommentsService);

    const comments = await listComments.execute({
      user_id,
      post_id,
    });

    return response.json(classToClass(comments));
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { post_id } = request.params;
    const { comment_id } = request.body;

    const deleteLike = container.resolve(DeleteCommentService);

    await deleteLike.execute({
      post_id,
      user_id,
      comment_id,
    });

    return response.json().send();
  }
}
