import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TermController from '../controllers/TermController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import adminDetector from '../middlewares/adminDetector';

const termsRouter = Router();
const termController = new TermController();

termsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      term_slug: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  termController.store,
);

termsRouter.get(
  '/:term_slug',
  celebrate({
    [Segments.PARAMS]: {
      term_slug: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  adminDetector,
  termController.index,
);

termsRouter.put(
  '/:term_slug',
  celebrate({
    [Segments.PARAMS]: {
      term_slug: Joi.string().required(),
    },
    [Segments.BODY]: {
      has_accepted: Joi.boolean().required(),
    },
  }),
  ensureAuthenticated,
  termController.update,
);

export default termsRouter;
