import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import PostsController from '../controllers/PostsController';

const feedRouter = Router();

const postsController = new PostsController();

feedRouter.get('/', ensureAuthenticated, postsController.index);

export default feedRouter;
