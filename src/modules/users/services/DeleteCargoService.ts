import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import ICargosRepository from '../repositories/ICargosRepository';

interface IRequest {
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

  public async execute({ user_id, cargo_id }: IRequest): Promise<void> {
    const foundUser = await this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('Only logged users can update cargos');
    }

    const foundCargo = await this.cargosRepository.findById(cargo_id);

    if (!foundCargo) {
      throw new AppError('Cargo not found.');
    }

    await this.cargosRepository.delete(foundCargo.id);
  }
}

export default UpdateCargoService;
