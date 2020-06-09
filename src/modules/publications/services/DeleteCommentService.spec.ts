// import AppError from '@shared/errors/AppError';

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
});
