// import AppError from '@shared/errors/AppError';

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

    const comment = await createComment.execute({
      post_id: post.id,
      user_id: user.id,
      content: 'Comentário teste',
    });

    expect(comment).toHaveProperty('user_id');
  });
});
