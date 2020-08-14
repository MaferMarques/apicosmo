// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeTermRepository from '../repositories/fakes/FakeTermRepository';
import CreateTermService from './CreateTermService';

let fakeUsersRepository: FakeUsersRepository;
let fakeTermRepository: FakeTermRepository;
let createTerm: CreateTermService;

describe('CreateTerm', () => {
  beforeEach(() => {
    fakeTermRepository = new FakeTermRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createTerm = new CreateTermService(fakeUsersRepository, fakeTermRepository);
  });

  it('should able to create a new term acceptance', async () => {
    const user = await fakeUsersRepository.create({
      email: 'test@test.com',
      password: '12345678',
      nickname: 'teste',
    });

    const term = await createTerm.execute({
      user_id: user.id,
      term_slug: 'privacy',
    });

    expect(term).toHaveProperty('has_accepted');
  });

  // it('should not be able to create a new cargo with a invalid id', async () => {
  //   expect(
  //     createCargo.execute({
  //       user_id: 'invalid id',
  //       name: 'administrador',
  //       description: 'libera a baderna',
  //       color: '#7159c1',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });

  // it('should not be able to create a existent cargo', async () => {
  //   const user = await fakeUsersRepository.create({
  //     nickname: 'teste',
  //     email: 'teste@teste.com',
  //     password: '123456',
  //   });

  //   await fakeCargoRepository.create({
  //     name: 'admin',
  //     color: '#7159c1',
  //     description: 'libera a barderna',
  //   });

  //   expect(
  //     createCargo.execute({
  //       user_id: user.id,
  //       name: 'admin',
  //       description: 'libera a baderna',
  //       color: '#7159c1',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
