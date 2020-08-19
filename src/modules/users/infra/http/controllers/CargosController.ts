import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCargoService from '@modules/users/services/CreateCargoService';
import UpdateCargoService from '@modules/users/services/UpdateCargoService';
import ReadCargosService from '@modules/users/services/ReadCargosService';
import DeleteCargoService from '@modules/users/services/DeleteCargoService';

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

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const readCargos = container.resolve(ReadCargosService);

    const cargos = await readCargos.execute({
      user_id,
    });

    return response.json(classToClass(cargos));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, description, color } = request.body;
    const { cargo_id } = request.params;
    const user_id = request.user.id;

    const updateCargo = container.resolve(UpdateCargoService);

    const cargo = await updateCargo.execute({
      name,
      description,
      color,
      user_id,
      cargo_id,
    });

    return response.json(classToClass(cargo));
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { cargo_id } = request.params;
    const user_id = request.user.id;

    const deleteCargo = container.resolve(DeleteCargoService);

    await deleteCargo.execute({
      user_id,
      cargo_id,
    });

    return response.json().send();
  }
}
