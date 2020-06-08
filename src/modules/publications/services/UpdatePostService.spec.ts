import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import UpdatePostService from './UpdatePostService';

let fakePostsRepository: FakePostsRepository;
let fakeUsersRepository: FakeUsersRepository;
let updatePost: UpdatePostService;

describe('CreatePost', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    updatePost = new UpdatePostService(
      fakePostsRepository,
      fakeUsersRepository,
    );
  });

  it('should able to update a existent post', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      content: 'teste',
      image: 'foto teste',
    });

    await updatePost.execute({
      user_id: user.id,
      post_id: post.id,
      content: 'teste mesmo',
    });

    expect(post.content).toEqual('teste mesmo');
  });

  it('should not be able to update a invalid post', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com',
      nickname: 'teste',
      password: '123456',
    });

    expect(
      updatePost.execute({
        content: 'post teste',
        user_id: user.id,
        post_id: 'invalid post id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
