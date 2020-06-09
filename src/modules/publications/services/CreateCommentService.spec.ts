import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';

import CreateCommentService from './CreateCommentService';

let fakePostsRepository: FakePostsRepository;
let fakeCommentsRepository: FakeCommentsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createComment: CreateCommentService;

describe('CreateComment', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCommentsRepository = new FakeCommentsRepository();

    createComment = new CreateCommentService(
      fakePostsRepository,
      fakeUsersRepository,
      fakeCommentsRepository,
    );
  });

  it('should able to create a comment in a post', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    const post = await fakePostsRepository.create({
      content: 'post teste',
      user_id: user.id,
    });

    await createComment.execute({
      post_id: post.id,
      user_id: user.id,
      content: 'Comentário teste',
    });

    expect(post.comments).toEqual(1);
  });

  it('should not able to create a comment in a without permission', async () => {
    const post = await fakePostsRepository.create({
      content: 'post teste',
      user_id: '123123',
    });

    expect(
      createComment.execute({
        post_id: post.id,
        user_id: 'invalid user id',
        content: 'Comentário teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not able to create a comment in a invalid post', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    expect(
      createComment.execute({
        post_id: 'invalid id',
        user_id: user.id,
        content: 'Comentário teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
