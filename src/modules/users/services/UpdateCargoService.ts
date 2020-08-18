import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import ICargosRepository from '../repositories/ICargosRepository';

import Cargo from '../infra/typeorm/entities/Cargo';

interface IRequest {
  name: string;
  description: string;
  color: string;
  user_id: string;
  cargo_id: string;
}

@injectable()
class UpdateCargoService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CargosRepository')
    private cargosRepository: ICargosRepository,
  ) {}

  public async execute({
    name,
    description,
    color,
    user_id,
    cargo_id,
  }: IRequest): Promise<Cargo> {
    const foundUser = await this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('Only logged users can update cargos');
    }

    const foundCargo = await this.cargosRepository.findById(cargo_id);

    if (!foundCargo) {
      throw new AppError('Cargo not found.');
    }

    const cargoExists = await this.cargosRepository.findByName(name);

    if (cargoExists && cargoExists.id !== cargo_id) {
      throw new AppError('Cargo already exists', 403);
    }

    if (name) {
      foundCargo.name = name;
    }

    if (description) {
      foundCargo.description = description;
    }

    if (color) {
      foundCargo.color = color;
    }

    const updatedCargo = await this.cargosRepository.save(foundCargo);

    return updatedCargo;
  }
}

export default UpdateCargoService;
