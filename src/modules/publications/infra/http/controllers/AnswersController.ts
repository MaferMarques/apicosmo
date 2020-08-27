import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAnswerService from '@modules/publications/services/CreateAnswerService';
// import DeleteCommentService from '@modules/publications/services/DeleteCommentService';
// import ListPostCommentsService from '@modules/publications/services/ListPostCommentsService';
// import UpdateCommentService from '@modules/publications/services/UpdateCommentService';

export default class AnswersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { post_id } = request.params;
    const { comment_id } = request.params;
    const { content } = request.body;

    const createAnswer = container.resolve(CreateAnswerService);

    const answer = await createAnswer.execute({
      content,
      user_id,
      post_id,
      comment_id,
    });

    return response.json(classToClass(answer));
  }

  // public async index(request: Request, response: Response): Promise<Response> {
  //   const user_id = request.user.id;
  //   const { post_id } = request.params;

  //   const listComments = container.resolve(ListPostCommentsService);

  //   const comments = await listComments.execute({
  //     user_id,
  //     post_id,
  //   });

  //   return response.json(classToClass(comments));
  // }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const user_id = request.user.id;
  //   const { post_id } = request.params;
  //   const { comment_id, content } = request.body;

  //   const updateComment = container.resolve(UpdateCommentService);

  //   const comment = await updateComment.execute({
  //     content,
  //     comment_id,
  //     user_id,
  //     post_id,
  //   });

  //   return response.json(classToClass(comment));
  // }

  // public async destroy(
  //   request: Request,
  //   response: Response,
  // ): Promise<Response> {
  //   const user_id = request.user.id;
  //   const { post_id } = request.params;
  //   const { comment_id } = request.body;

  //   const deleteLike = container.resolve(DeleteCommentService);

  //   await deleteLike.execute({
  //     post_id,
  //     user_id,
  //     comment_id,
  //   });

  //   return response.json().send();
  // }
}
