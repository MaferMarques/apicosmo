import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';

import DeletePostService from './DeletePostService';

let fakePostsRepository: FakePostsRepository;
let fakeUsersRepository: FakeUsersRepository;
let deletePost: DeletePostService;

describe('DeletePost', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    deletePost = new DeletePostService(
      fakePostsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to delete a post', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    const post1 = await fakePostsRepository.create({
      content: 'post teste',
      user_id: user.id,
    });

    const deleted = await deletePost.execute({
      post_id: post1.id,
      user_id: user.id,
    });

    expect(deleted).toEqual(undefined);
  });

  it('should not be able to delete a other user post', async () => {
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

    const postFromUser1 = await fakePostsRepository.create({
      content: 'post teste',
      user_id: user1.id,
    });

    expect(
      deletePost.execute({
        post_id: postFromUser1.id,
        user_id: user2.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
