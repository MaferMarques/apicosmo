import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CargosController from '../controllers/CargosController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import adminDetector from '../middlewares/adminDetector';

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
  adminDetector,
  cargosController.create,
);

cargosRouter.get(
  '/',
  ensureAuthenticated,
  adminDetector,
  cargosController.index,
);

cargosRouter.put(
  '/:cargo_id',
  celebrate({
    [Segments.PARAMS]: {
      cargo_id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      description: Joi.string(),
      color: Joi.string(),
    },
  }),
  ensureAuthenticated,
  adminDetector,
  cargosController.update,
);

cargosRouter.delete(
  '/:cargo_id',
  celebrate({
    [Segments.PARAMS]: {
      cargo_id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  adminDetector,
  cargosController.destroy,
);

export default cargosRouter;
