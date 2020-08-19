import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeCargoRepository from '../repositories/fakes/FakeCargoRepository';
import DeleteCargoService from './DeleteCargoService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCargoRepository: FakeCargoRepository;
let deleteCargo: DeleteCargoService;

describe('DeleteCargo', () => {
  beforeEach(() => {
    fakeCargoRepository = new FakeCargoRepository();
    fakeUsersRepository = new FakeUsersRepository();

    deleteCargo = new DeleteCargoService(
      fakeUsersRepository,
      fakeCargoRepository,
    );
  });

  it('should able to delete a cargo', async () => {
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

    const deletedCargo = await deleteCargo.execute({
      user_id: user.id,
      cargo_id: cargo.id,
    });

    expect(deletedCargo).toBe(undefined);
  });

  it('should not be able to delete a new cargo with a invalid id', async () => {
    expect(
      deleteCargo.execute({
        user_id: 'invalid id',
        cargo_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a non-existent cargo', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(
      deleteCargo.execute({
        user_id: user.id,
        cargo_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
