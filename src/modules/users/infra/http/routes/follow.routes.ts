import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import FollowController from '../controllers/FollowController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const followRouter = Router();
const followController = new FollowController();

followRouter.post(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  followController.create,
);

followRouter.delete(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  followController.destroy,
);

export default followRouter;
