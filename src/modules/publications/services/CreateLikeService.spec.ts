import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import FakeLikeRepository from '../repositories/fakes/FakeLikeRepository';

import CreateLikeService from './CreateLikeService';

let fakePostsRepository: FakePostsRepository;
let fakeLikeRepository: FakeLikeRepository;
let fakeUsersRepository: FakeUsersRepository;
let createLike: CreateLikeService;

describe('CreateLike', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeLikeRepository = new FakeLikeRepository();

    createLike = new CreateLikeService(
      fakePostsRepository,
      fakeLikeRepository,
      fakeUsersRepository,
    );
  });

  it('should able to create a like in a post', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    const post = await fakePostsRepository.create({
      content: 'post teste',
      user_id: user.id,
    });

    const like = await createLike.execute({
      post_id: post.id,
      user_id: user.id,
    });

    expect(like).toHaveProperty('user_id');
  });

  it('should not be able to like a post with a invalid user id', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    const post = await fakePostsRepository.create({
      content: 'post teste',
      user_id: user.id,
    });

    expect(
      createLike.execute({
        user_id: 'invalid id',
        post_id: post.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to like a post with a invalid post id', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    expect(
      createLike.execute({
        user_id: user.id,
        post_id: 'invalid post id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to like a post twice', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    const post = await fakePostsRepository.create({
      content: 'teste teste teste',
      user_id: user.id,
    });

    await createLike.execute({
      user_id: user.id,
      post_id: post.id,
    });

    expect(
      createLike.execute({
        user_id: user.id,
        post_id: post.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('should not be able to create a like in a post', async () => {
  //   expect(
  //     createLike.execute({
  //       post_id: ''
  //       user_id: 'invalid id',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
