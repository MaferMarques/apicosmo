import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeCargoRepository from '../repositories/fakes/FakeCargoRepository';
import UpdateCargoService from './UpdateCargoService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCargoRepository: FakeCargoRepository;
let updateCargo: UpdateCargoService;

describe('UpdateCargo', () => {
  beforeEach(() => {
    fakeCargoRepository = new FakeCargoRepository();
    fakeUsersRepository = new FakeUsersRepository();

    updateCargo = new UpdateCargoService(
      fakeUsersRepository,
      fakeCargoRepository,
    );
  });

  it('should able to update a new cargo', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    const cargo = await fakeCargoRepository.create({
      name: 'administrador',
      description: 'libera a baderna',
      color: '#7159c1',
    });

    const updatedCargo = await updateCargo.execute({
      user_id: user.id,
      name: 'adm',
      description: 'libera a badernaa',
      color: '#7159c5',
      cargo_id: cargo.id,
    });

    expect(updatedCargo.description).toEqual('libera a badernaa');
  });

  it('should not be able to update a new cargo with a invalid id', async () => {
    expect(
      updateCargo.execute({
        user_id: 'invalid id',
        name: 'administrador',
        description: 'libera a baderna',
        color: '#7159c1',
        cargo_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a non-existent cargo', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(
      updateCargo.execute({
        user_id: user.id,
        name: 'admin',
        description: 'libera a baderna',
        color: '#7159c1',
        cargo_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
