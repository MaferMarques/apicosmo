import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'fulano@fulano.com',
      password: 'fulano',
      nickname: 'teste infinito',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      email: 'fulanodois@email.com',
    });

    expect(updatedUser.nickname).toBe('teste infinito');
    expect(updatedUser.email).toBe('fulanodois@email.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing id',
        email: 'fulano@fulano.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to a already used email', async () => {
    await fakeUsersRepository.create({
      email: 'fulano@fulano.com',
      password: 'fulano',
      nickname: 'teste',
    });

    const user = await fakeUsersRepository.create({
      email: 'teste@fulano.com',
      password: 'fulano',
      nickname: 'teste',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: 'fulano@fulano.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'fulano@fulano.com',
      password: '123456',
      nickname: 'teste',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      email: 'teste@fulano.com',
      old_password: '123456',
      new_password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'fulano@fulano.com',
      password: '123456',
      nickname: 'teste',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: 'teste@fulano.com',
        new_password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'fulano@fulano.com',
      password: '123456',
      nickname: 'teste',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: 'teste@fulano.com',
        new_password: '123123',
        old_password: 'senhaerrada',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
