import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import cargosRouter from '@modules/users/infra/http/routes/cargos.routes';
import followRouter from '@modules/users/infra/http/routes/follow.routes';

import postsRouter from '@modules/publications/infra/http/routes/posts.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/cargos', cargosRouter);
routes.use('/follow', followRouter);

routes.use('/posts', postsRouter);

export default routes;
