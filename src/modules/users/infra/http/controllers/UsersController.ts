import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserCargoService from '@modules/users/services/UpdateUserCargoService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password, nickname } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      email,
      password,
      nickname,
    });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id, cargo_name } = request.body;

    const updateUserCargo = container.resolve(UpdateUserCargoService);

    const user = await updateUserCargo.execute({
      user_id,
      cargo_name,
    });

    return response.json(classToClass(user));
  }
}
