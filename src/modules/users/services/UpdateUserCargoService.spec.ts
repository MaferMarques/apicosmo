import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeCargoRepository from '../repositories/fakes/FakeCargoRepository';
import UpdateUserCargoService from './UpdateUserCargoService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCargoRepository: FakeCargoRepository;
let updateUserCargo: UpdateUserCargoService;

describe('UpdateUserCargo', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCargoRepository = new FakeCargoRepository();

    updateUserCargo = new UpdateUserCargoService(
      fakeUsersRepository,
      fakeCargoRepository,
    );
  });

  it('should able to update the user cargo', async () => {
    const user = await fakeUsersRepository.create({
      email: 'fulano@fulano.com',
      password: 'fulano',
      nickname: 'teste infinito',
    });

    await fakeCargoRepository.create({
      name: 'admin',
      description: 'libera a baderna',
      color: '#7159c1',
    });

    const updatedUser = await updateUserCargo.execute({
      user_id: user.id,
      cargo_name: 'admin',
    });

    expect(updatedUser.cargo.name).toBe('admin');
  });

  it('should not be able to update the user cargo without valid user', async () => {
    expect(
      updateUserCargo.execute({
        user_id: 'invalid id',
        cargo_name: 'admin',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user cargo without a existent cargo', async () => {
    const user = await fakeUsersRepository.create({
      nickname: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(
      updateUserCargo.execute({
        user_id: user.id,
        cargo_name: 'invalid cargo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
