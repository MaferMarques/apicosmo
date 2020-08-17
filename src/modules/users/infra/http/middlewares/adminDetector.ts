import { Request, Response, NextFunction } from 'express';
import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import User from '../../typeorm/entities/User';
// import { verify } from 'jsonwebtoken';

// import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function adminDetector(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.user;

  const usersRepository = getRepository(User);

  try {
    const foundUser = await usersRepository.findOne(id);

    if (!foundUser) {
      throw new AppError('User not found.', 403);
    }

    if (foundUser.cargo.name !== 'Admin') {
      throw new AppError('Unauthorized.', 403);
    }

    return next();
  } catch {
    throw new AppError('Unauthorized.', 403);
  }
}
