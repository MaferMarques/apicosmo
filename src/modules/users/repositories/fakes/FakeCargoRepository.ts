import ICargosRepository from '@modules/users/repositories/ICargosRepository';
import ICreateCargoDTO from '@modules/users/dtos/ICreateCargoDTO';

import Cargo from '@modules/users/infra/typeorm/entities/Cargo';

import { uuid } from 'uuidv4';

class FakeCargoRepository implements ICargosRepository {
  private cargos: Cargo[] = [];

  public async create(cargoData: ICreateCargoDTO): Promise<Cargo> {
    const cargo = new Cargo();

    Object.assign(cargo, { id: uuid() }, cargoData);

    this.cargos.push(cargo);

    return cargo;
  }

  public async findByName(name: string): Promise<Cargo | undefined> {
    const foundCargo = this.cargos.find((cargo) => cargo.name === name);

    return foundCargo;
  }
}

export default FakeCargoRepository;
