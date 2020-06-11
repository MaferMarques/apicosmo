import AppError from '@shared/errors/AppError';

import FakeFollowRepository from '../repositories/fakes/FakeFollowRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateFollowRelationService from './CreateFollowRelationService';

let fakeFollowRepository: FakeFollowRepository;
let fakeUsersRepository: FakeUsersRepository;
let createFollow: CreateFollowRelationService;

describe('CreateFollow', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeFollowRepository = new FakeFollowRepository();

    createFollow = new CreateFollowRelationService(
      fakeUsersRepository,
      fakeFollowRepository,
    );
  });

  it('should able to follow a user', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'test@test.com',
      password: '12345678',
      nickname: 'teste',
    });

    const user2 = await fakeUsersRepository.create({
      email: 'test@test.com',
      password: '12345678',
      nickname: 'teste',
    });

    const follow = await createFollow.execute({
      follower_id: user1.id,
      user_id: user2.id,
    });

    expect(follow).toHaveProperty('id');
  });

  it('should not be able to follow a same user twice', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'test@test.com',
      password: '12345678',
      nickname: 'teste',
    });

    const user2 = await fakeUsersRepository.create({
      email: 'test@test.com',
      password: '12345678',
      nickname: 'teste',
    });

    await fakeFollowRepository.create(user1.id, user2.id);

    expect(
      createFollow.execute({
        user_id: user1.id,
        follower_id: user2.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('user should not be able to follow himself', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'test@test.com',
      password: '12345678',
      nickname: 'teste',
    });

    expect(
      createFollow.execute({
        user_id: user1.id,
        follower_id: user1.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('user should not be able to follow a user without permission', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'test@test.com',
      password: '12345678',
      nickname: 'teste',
    });

    expect(
      createFollow.execute({
        user_id: user1.id,
        follower_id: 'invalid id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('user should not be able to follow a invalid user', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'test@test.com',
      password: '12345678',
      nickname: 'teste',
    });

    expect(
      createFollow.execute({
        user_id: 'invalid id',
        follower_id: user1.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
