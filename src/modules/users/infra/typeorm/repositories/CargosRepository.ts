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

  public async findById(id: string): Promise<Cargo | undefined> {
    const foundCargo = this.ormRepository.findOne({
      where: { id },
    });

    return foundCargo;
  }

  public async save(cargo: Cargo): Promise<Cargo> {
    return this.ormRepository.save(cargo);
  }

  public async findAll(): Promise<Cargo[] | undefined> {
    const cargos = this.ormRepository.find();

    return cargos;
  }
}

export default CargosRepository;
