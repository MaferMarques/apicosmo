import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';

import UpdateCommentService from './UpdateCommentService';

let fakePostsRepository: FakePostsRepository;
let fakeCommentsRepository: FakeCommentsRepository;
let fakeUsersRepository: FakeUsersRepository;
let updateComment: UpdateCommentService;

describe('updateComment', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCommentsRepository = new FakeCommentsRepository();

    updateComment = new UpdateCommentService(
      fakePostsRepository,
      fakeUsersRepository,
      fakeCommentsRepository,
    );
  });

  it('should able to update a comment in a post', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    const post = await fakePostsRepository.create({
      content: 'post teste',
      user_id: user.id,
    });

    const comment = await fakeCommentsRepository.create({
      post_id: post.id,
      user_id: user.id,
      content: 'Comentário teste',
      type: 1,
    });

    await updateComment.execute({
      user_id: user.id,
      post_id: post.id,
      comment_id: comment.id,
      content: 'Comentário teste modificado',
    });

    expect(comment.content).toEqual('Comentário teste modificado');
  });

  it('should not able to updated a comment in a without permission', async () => {
    const post = await fakePostsRepository.create({
      content: 'post teste',
      user_id: '123123',
    });

    const comment = await fakeCommentsRepository.create({
      user_id: '123123',
      content: 'teste teste teste',
      post_id: '123123123',
      type: 1,
    });

    expect(
      updateComment.execute({
        post_id: post.id,
        user_id: 'invalid user id',
        content: 'bla bla bla',
        comment_id: comment.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not able to update a comment in a invalid post', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    const comment = await fakeCommentsRepository.create({
      user_id: '123123',
      content: 'teste teste teste',
      post_id: '123123123',
      type: 1,
    });

    expect(
      updateComment.execute({
        post_id: 'invalid id',
        user_id: user.id,
        comment_id: comment.id,
        content: 'bla bla bla',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not able to update a comment without valid id', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    const post = await fakePostsRepository.create({
      content: 'post teste',
      user_id: '123123',
    });

    expect(
      updateComment.execute({
        post_id: post.id,
        user_id: user.id,
        comment_id: 'invalid id',
        content: 'bla bla bla',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not able to delete a other user comment', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    const post = await fakePostsRepository.create({
      content: 'post teste',
      user_id: '123123',
    });

    const comment = await fakeCommentsRepository.create({
      user_id: '123123',
      content: 'teste teste teste',
      post_id: '123123123',
      type: 1,
    });

    expect(
      updateComment.execute({
        post_id: post.id,
        user_id: user.id,
        comment_id: comment.id,
        content: 'bla bla bla',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
