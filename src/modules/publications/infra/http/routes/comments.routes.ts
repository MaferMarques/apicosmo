import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CommentsController from '../controllers/CommentsController';

const commentsRouter = Router();

const commentsController = new CommentsController();

commentsRouter.post(
  '/:post_id/likes',
  ensureAuthenticated,
  celebrate(
    {
      body: Joi.object().keys({
        content: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    },
  ),
  commentsController.create,
);

export default commentsRouter;
