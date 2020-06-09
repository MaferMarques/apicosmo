import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';

import DeleteCommentService from './DeleteCommentService';

let fakePostsRepository: FakePostsRepository;
let fakeCommentsRepository: FakeCommentsRepository;
let fakeUsersRepository: FakeUsersRepository;
let deleteComment: DeleteCommentService;

describe('DeleteComment', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCommentsRepository = new FakeCommentsRepository();

    deleteComment = new DeleteCommentService(
      fakePostsRepository,
      fakeUsersRepository,
      fakeCommentsRepository,
    );
  });

  it('should able to delete a comment in a post', async () => {
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

    post.comments = 1;

    await deleteComment.execute({
      user_id: user.id,
      post_id: post.id,
      comment_id: comment.id,
    });

    expect(post.comments).toEqual(0);
  });

  it('should not able to delete a comment in a without permission', async () => {
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
      deleteComment.execute({
        post_id: post.id,
        user_id: 'invalid user id',
        comment_id: comment.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not able to delete a comment in a invalid post', async () => {
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
      deleteComment.execute({
        post_id: 'invalid id',
        user_id: user.id,
        comment_id: comment.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not able to delete a comment without valid id', async () => {
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
      deleteComment.execute({
        post_id: post.id,
        user_id: user.id,
        comment_id: 'invalid id',
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
      deleteComment.execute({
        post_id: post.id,
        user_id: user.id,
        comment_id: comment.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
