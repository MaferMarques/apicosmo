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
class ListTermService {
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

    const term = await this.termRepository.findByTermSlugAndUserId(
      term_slug,
      user_id,
    );

    if (!term) {
      throw new AppError('Term not found.', 404);
    }

    return term;
  }
}

export default ListTermService;
