import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import PostsController from '../controllers/PostsController';
import PostsImageController from '../controllers/PostsImageController';
import LikesController from '../controllers/LikesController';
import CommentsController from '../controllers/CommentsController';
import AnswersController from '../controllers/AnswersController';

const postsRouter = Router();

const postsController = new PostsController();
const postsImageController = new PostsImageController();
const likesController = new LikesController();
const commentsController = new CommentsController();
const answersController = new AnswersController();

const upload = multer(uploadConfig);

postsRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('image'),
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
  postsController.create,
);

postsRouter.get('/', ensureAuthenticated, postsController.index);

postsRouter.put(
  '/:post_id',
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
  postsController.update,
);

postsRouter.delete('/:post_id', ensureAuthenticated, postsController.destroy);

postsRouter.patch(
  '/:post_id/image',
  ensureAuthenticated,
  upload.single('image'),
  postsImageController.update,
);

// Like Part
postsRouter.post(
  '/:post_id/likes',
  ensureAuthenticated,
  likesController.create,
);

postsRouter.delete(
  '/:post_id/likes',
  ensureAuthenticated,
  likesController.destroy,
);

//

// Comment Part
postsRouter.post(
  '/:post_id/comments',
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

postsRouter.get(
  '/:post_id/comments',
  ensureAuthenticated,
  commentsController.index,
);

postsRouter.put(
  '/:post_id/comments',
  ensureAuthenticated,
  celebrate(
    {
      body: Joi.object().keys({
        content: Joi.string().required(),
        comment_id: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    },
  ),
  commentsController.update,
);

postsRouter.delete(
  '/:post_id/comments',
  ensureAuthenticated,
  celebrate({
    body: Joi.object().keys({
      comment_id: Joi.string().required(),
    }),
  }),
  commentsController.destroy,
);
//

// Answer Part
postsRouter.post(
  '/:post_id/comments/:comment_id/answers',
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
  answersController.create,
);

postsRouter.get(
  '/:post_id/comments/:comment_id/answers',
  ensureAuthenticated,
  answersController.index,
);

postsRouter.put(
  '/:post_id/comments/:comment_id/answers',
  ensureAuthenticated,
  celebrate(
    {
      body: Joi.object().keys({
        content: Joi.string().required(),
        comment_id: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    },
  ),
  answersController.update,
);

postsRouter.delete(
  '/:post_id/comments/:comment_id/answers',
  ensureAuthenticated,
  celebrate({
    body: Joi.object().keys({
      comment_id: Joi.string().required(),
    }),
  }),
  answersController.destroy,
);
//

export default postsRouter;
