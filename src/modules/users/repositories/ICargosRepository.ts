import ICreateCargoDTO from '../dtos/ICreateCargoDTO';

import Cargo from '../infra/typeorm/entities/Cargo';

export default interface ICargoRepository {
  create(data: ICreateCargoDTO): Promise<Cargo>;
  findByName(name: string): Promise<Cargo | undefined>;
}
