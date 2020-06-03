// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeFollowRepository from '@modules/users/repositories/fakes/FakeFollowRepository';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import ListPostsByFollowedUsersService from './ListPostsByFollowedUsersService';

let fakePostsRepository: FakePostsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeFollowRepository: FakeFollowRepository;
let listPostsByFollowedUsers: ListPostsByFollowedUsersService;

describe('ListPosts', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeFollowRepository = new FakeFollowRepository();

    listPostsByFollowedUsers = new ListPostsByFollowedUsersService(
      fakePostsRepository,
      fakeFollowRepository,
      fakeUsersRepository,
    );
  });

  it('should able to list all post by followed user', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    const post1 = await fakePostsRepository.create({
      user_id: user2.id,
      content: 'teste teste teste',
    });

    const post2 = await fakePostsRepository.create({
      user_id: user2.id,
      content: 'teste teste teste',
    });

    const feed = listPostsByFollowedUsers.execute({
      user_id: user1.id,
    });

    expect(feed).toEqual([post1, post2]);
  });
});
