import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CargosController from '../controllers/CargosController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const cargosRouter = Router();
const cargosController = new CargosController();

cargosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      color: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  cargosController.create,
);

export default cargosRouter;
