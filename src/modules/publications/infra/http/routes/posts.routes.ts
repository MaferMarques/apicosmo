import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import PostsController from '../controllers/PostsController';
import PostsImageController from '../controllers/PostsImageController';
import LikesController from '../controllers/LikesController';

const postsRouter = Router();

const postsController = new PostsController();
const postsImageController = new PostsImageController();
const likesController = new LikesController();

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

postsRouter.patch(
  '/:post_id/image',
  ensureAuthenticated,
  upload.single('image'),
  postsImageController.update,
);

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

export default postsRouter;
