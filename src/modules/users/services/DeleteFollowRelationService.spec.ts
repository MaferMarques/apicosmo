import AppError from '@shared/errors/AppError';

import FakeFollowRepository from '../repositories/fakes/FakeFollowRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import DeleteFollowRelationService from './DeleteFollowRelationService';

let fakeFollowRepository: FakeFollowRepository;
let fakeUsersRepository: FakeUsersRepository;
let deleteFollow: DeleteFollowRelationService;

describe('DeleteFollow', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeFollowRepository = new FakeFollowRepository();

    deleteFollow = new DeleteFollowRelationService(
      fakeUsersRepository,
      fakeFollowRepository,
    );
  });

  it('should able to unfollow a user', async () => {
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

    const unfollow = await deleteFollow.execute({
      user_id: user1.id,
      follower_id: user2.id,
    });

    expect(unfollow).toBe(undefined);
  });

  it('user should not be able to unfollow himself', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'test@test.com',
      password: '12345678',
      nickname: 'teste',
    });

    expect(
      deleteFollow.execute({
        user_id: user1.id,
        follower_id: user1.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
