import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeCargoRepository from '../repositories/fakes/FakeCargoRepository';
import CreateCargoService from './CreateCargoService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCargoRepository: FakeCargoRepository;
let createCargo: CreateCargoService;

describe('CreateCargo', () => {
  beforeEach(() => {
    fakeCargoRepository = new FakeCargoRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createCargo = new CreateCargoService(
      fakeUsersRepository,
      fakeCargoRepository,
    );
  });

  it('should able to create a new cargo', async () => {
    const user = await fakeUsersRepository.create({
      email: 'test@test.com',
      password: '12345678',
      nickname: 'teste',
    });

    const cargo = await createCargo.execute({
      user_id: user.id,
      name: 'administrador',
      description: 'libera a baderna',
      color: '#7159c1',
    });

    expect(cargo).toHaveProperty('description');
  });

  it('should not be able to create a new cargo with a invalid id', async () => {
    expect(
      createCargo.execute({
        user_id: 'invalid id',
        name: 'administrador',
        description: 'libera a baderna',
        color: '#7159c1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a existent cargo', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    await fakeCargoRepository.create({
      name: 'admin',
      color: '#7159c1',
      description: 'libera a barderna',
    });

    expect(
      createCargo.execute({
        user_id: user.id,
        name: 'admin',
        description: 'libera a baderna',
        color: '#7159c1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
