import { getRepository, Repository } from 'typeorm';

import ICargosRepository from '@modules/users/repositories/ICargosRepository';
import ICreateCargoDTO from '@modules/users/dtos/ICreateCargoDTO';

import Cargo from '../entities/Cargo';

class CargosRepository implements ICargosRepository {
  private ormRepository: Repository<Cargo>;

  constructor() {
    this.ormRepository = getRepository(Cargo);
  }

  public async create(cargoData: ICreateCargoDTO): Promise<Cargo> {
    const cargo = this.ormRepository.create(cargoData);

    await this.ormRepository.save(cargo);

    return cargo;
  }

  public async findByName(name: string): Promise<Cargo | undefined> {
    const foundCargo = this.ormRepository.findOne({
      where: { name },
    });

    return foundCargo;
  }
}

export default CargosRepository;
