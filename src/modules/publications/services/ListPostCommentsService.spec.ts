import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';

import ListPostCommentsService from './ListPostCommentsService';

let fakePostsRepository: FakePostsRepository;
let fakeCommentsRepository: FakeCommentsRepository;
let fakeUsersRepository: FakeUsersRepository;
let listComments: ListPostCommentsService;

describe('listComments', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCommentsRepository = new FakeCommentsRepository();

    listComments = new ListPostCommentsService(
      fakePostsRepository,
      fakeUsersRepository,
      fakeCommentsRepository,
    );
  });

  it('should able to list all comments from a post', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: 'testesteste',
    });

    const post = await fakePostsRepository.create({
      content: 'post teste',
      user_id: user.id,
    });

    const comment1 = await fakeCommentsRepository.create({
      content: 'comentário teste',
      post_id: post.id,
      type: 1,
      user_id: user.id,
    });

    const comment2 = await fakeCommentsRepository.create({
      content: 'comentário teste de novo',
      post_id: post.id,
      type: 1,
      user_id: user.id,
    });

    const comments = await listComments.execute({
      post_id: post.id,
      user_id: user.id,
    });

    expect(comments).toEqual([comment1, comment2]);
  });

  it('should not be able to list all comments without permission', async () => {
    const post = await fakePostsRepository.create({
      content: 'post teste',
      user_id: '123123',
    });

    expect(
      listComments.execute({
        post_id: post.id,
        user_id: 'invalid user id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to list all comments from invalid post', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: 'testesteste',
    });

    expect(
      listComments.execute({
        post_id: 'invalid post id',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
