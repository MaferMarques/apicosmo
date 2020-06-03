import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import UpdatePostImageService from './UpdatePostImageService';

let fakePostsRepository: FakePostsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updatePostImage: UpdatePostImageService;

describe('UpdatePostImage', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updatePostImage = new UpdatePostImageService(
      fakePostsRepository,
      fakeStorageProvider,
    );
  });

  it('should able update post image', async () => {
    const user = await fakeUsersRepository.create({
      email: 'fulano@fulano.com',
      password: 'fulano',
      nickname: 'teste',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      content: 'teste teste teste',
    });

    await updatePostImage.execute({
      post_id: post.id,
      postFilename: 'post.jpg',
    });

    expect(post.image).toEqual('post.jpg');
  });

  it('should not able update post image', async () => {
    expect(
      updatePostImage.execute({
        post_id: 'invalid id',
        postFilename: 'post.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
