import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TermController from '../controllers/TermController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

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
  termController.create,
);

export default termsRouter;
