import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import ICargosRepository from '../repositories/ICargosRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  cargo_name: string;
}

@injectable()
class UpdateUserCargoService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CargosRepository')
    private cargosRepository: ICargosRepository,
  ) {}

  public async execute({ user_id, cargo_name }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not Found.');
    }
    const foundCargo = await this.cargosRepository.findByName(cargo_name);

    if (!foundCargo) {
      throw new AppError('Cargo not found');
    }

    user.cargo = foundCargo;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserCargoService;
