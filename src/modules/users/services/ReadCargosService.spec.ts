import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeCargoRepository from '../repositories/fakes/FakeCargoRepository';
import ReadCargosService from './ReadCargosService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCargoRepository: FakeCargoRepository;
let readCargos: ReadCargosService;

describe('ReadCargos', () => {
  beforeEach(() => {
    fakeCargoRepository = new FakeCargoRepository();
    fakeUsersRepository = new FakeUsersRepository();

    readCargos = new ReadCargosService(
      fakeUsersRepository,
      fakeCargoRepository,
    );
  });

  it('should able to list all cargos', async () => {
    const user = await fakeUsersRepository.create({
      email: 'test@test.com',
      password: '12345678',
      nickname: 'teste',
    });

    const cargo1 = await fakeCargoRepository.create({
      name: 'admin',
      color: '#7159c1',
      description: 'libera a barderna',
    });

    const cargo2 = await fakeCargoRepository.create({
      name: 'admin',
      color: '#7159c1',
      description: 'libera a barderna',
    });

    const cargos = await readCargos.execute({
      user_id: user.id,
    });

    expect(cargos).toEqual([cargo1, cargo2]);
  });

  it('should not be able to read all cargos with a invalid id', async () => {
    expect(
      readCargos.execute({
        user_id: 'invalid id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
