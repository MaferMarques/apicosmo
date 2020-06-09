import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import IPostsRepository from '@modules/publications/repositories/IPostsRepository';
import PostsRepository from '@modules/publications/infra/typeorm/repositories/PostsRepository';

import ICargosRepository from '@modules/users/repositories/ICargosRepository';
import CargosRepository from '@modules/users/infra/typeorm/repositories/CargosRepository';

import ILikesRepository from '@modules/publications/repositories/ILikesRepository';
import LikesRepository from '@modules/publications/infra/typeorm/repositories/LikesRepository';

import IFollowRepository from '@modules/users/repositories/IFollowRepository';
import FollowRepository from '@modules/users/infra/typeorm/repositories/FollowRepository';

import ICommentsRepository from '@modules/publications/repositories/ICommentsRepository';
import CommentsRepository from '@modules/publications/infra/typeorm/repositories/CommentsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);

container.registerSingleton<ICargosRepository>(
  'CargosRepository',
  CargosRepository,
);

container.registerSingleton<ILikesRepository>(
  'LikesRepository',
  LikesRepository,
);

container.registerSingleton<IFollowRepository>(
  'FollowRepository',
  FollowRepository,
);

container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository,
);
