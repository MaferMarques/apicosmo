// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import CreatePostService from './CreatePostService';

let fakePostsRepository: FakePostsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createPost: CreatePostService;

describe('CreatePost', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createPost = new CreatePostService(
      fakePostsRepository,
      fakeUsersRepository,
    );
  });

  it('should able to create a new post', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    const post = await createPost.execute({
      content: 'post teste',
      user_id: user.id,
    });

    expect(post).toHaveProperty('content');
  });

  it('should not be able to create a new post', async () => {
    expect(
      createPost.execute({
        content: 'post teste',
        user_id: 'invalid id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
