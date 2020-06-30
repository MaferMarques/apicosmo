// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import ListPostsByFollowedUsersService from './ListPostsByFollowedUsersService';

let fakePostsRepository: FakePostsRepository;
let fakeUsersRepository: FakeUsersRepository;
let listPosts: ListPostsByFollowedUsersService;

describe('ListPosts', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    listPosts = new ListPostsByFollowedUsersService(
      fakePostsRepository,
      fakeUsersRepository,
    );
  });

  it('should able to list all post', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    const post1 = await fakePostsRepository.create({
      content: 'teste teste teste',
      user_id: user.id,
    });

    const post2 = await fakePostsRepository.create({
      content: 'teste teste teste',
      user_id: user.id,
    });

    const posts = await listPosts.execute({
      user_id: user.id,
    });

    expect(posts).toEqual([post1, post2]);
  });
  it('should not be able to list all post without authorization', async () => {
    expect(
      listPosts.execute({
        user_id: 'invalid id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
