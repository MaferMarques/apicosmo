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
}

@injectable()
class CreateCargoService {
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
  }: IRequest): Promise<Cargo> {
    const foundUser = await this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('Only logged users can create cargos');
    }

    const foundCargo = await this.cargosRepository.findByName(name);

    if (foundCargo) {
      throw new AppError('Cargo already exists.');
    }

    const cargo = await this.cargosRepository.create({
      name,
      color,
      description,
    });

    return cargo;
  }
}

export default CreateCargoService;
