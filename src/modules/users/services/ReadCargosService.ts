import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import ICargosRepository from '../repositories/ICargosRepository';

import Cargo from '../infra/typeorm/entities/Cargo';

interface IRequest {
  user_id: string;
}

@injectable()
class ReadCargosService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CargosRepository')
    private cargosRepository: ICargosRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Cargo[]> {
    const foundUser = await this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('Only logged users can read cargos');
    }

    const foundCargos = await this.cargosRepository.findAll();

    if (!foundCargos) {
      throw new AppError('Cargos not found :(');
    }

    return foundCargos;
  }
}

export default ReadCargosService;
