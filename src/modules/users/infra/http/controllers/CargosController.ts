import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCargoService from '@modules/users/services/CreateCargoService';

export default class CargosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, color } = request.body;
    const user_id = request.user.id;

    const createCargo = container.resolve(CreateCargoService);

    const cargo = await createCargo.execute({
      name,
      description,
      color,
      user_id,
    });

    return response.json(classToClass(cargo));
  }
}
