import ICreateCargoDTO from '../dtos/ICreateCargoDTO';

import Cargo from '../infra/typeorm/entities/Cargo';

export default interface ICargoRepository {
  create(data: ICreateCargoDTO): Promise<Cargo>;
  findByName(name: string): Promise<Cargo | undefined>;
  findById(cargo_id: string): Promise<Cargo | undefined>;
  save(cargo: Cargo): Promise<Cargo>;
  findAll(): Promise<Cargo[] | undefined>;
  delete(cargo_id: string): Promise<void>;
}
