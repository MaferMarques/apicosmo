import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import ITermRepository from '../repositories/ITermRepository';

import Term from '../infra/typeorm/entities/Term';

interface IRequest {
  term_slug: string;
  user_id: string;
}

@injectable()
class CreateTermService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TermRepository')
    private termRepository: ITermRepository,
  ) {}

  public async execute({ term_slug, user_id }: IRequest): Promise<Term> {
    const foundUser = await this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('Only logged users can create terms');
    }

    const foundTerm = await this.termRepository.findByTermSlug(term_slug);

    if (foundTerm) {
      throw new AppError('Term already exists.');
    }

    const term = await this.termRepository.create({
      user_id,
      term_slug,
    });

    return term;
  }
}

export default CreateTermService;
