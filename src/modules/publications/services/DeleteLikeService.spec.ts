import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import FakeLikeRepository from '../repositories/fakes/FakeLikeRepository';

import DeleteLikeService from './DeleteLikeService';

let fakePostsRepository: FakePostsRepository;
let fakeLikeRepository: FakeLikeRepository;
let fakeUsersRepository: FakeUsersRepository;
let deleteLike: DeleteLikeService;

describe('DeleteLike', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeLikeRepository = new FakeLikeRepository();

    deleteLike = new DeleteLikeService(
      fakePostsRepository,
      fakeLikeRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to delete a like in a post', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    const post = await fakePostsRepository.create({
      content: 'post teste',
      user_id: user.id,
    });

    await fakeLikeRepository.create({
      post_id: post.id,
      user_id: user.id,
    });

    post.likes = 1;

    await deleteLike.execute({
      post_id: post.id,
      user_id: user.id,
    });

    expect(post.likes).toEqual(0);
  });

  it('should not be able to dislike a post with a invalid user id', async () => {
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
      deleteLike.execute({
        user_id: 'invalid id',
        post_id: post.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to dislike a post with a invalid post id', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    expect(
      deleteLike.execute({
        user_id: user.id,
        post_id: 'invalid post id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to dislike a post when user didnt like it', async () => {
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
      deleteLike.execute({
        user_id: user.id,
        post_id: post.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to dislike a post when it has 0 likes', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    const post = await fakePostsRepository.create({
      content: 'post teste',
      user_id: user.id,
    });

    await fakeLikeRepository.create({
      post_id: post.id,
      user_id: user.id,
    });

    post.likes = 0;

    expect(
      deleteLike.execute({
        user_id: user.id,
        post_id: post.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
