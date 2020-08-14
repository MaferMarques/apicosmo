import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import ITermRepository from '../repositories/ITermRepository';

import Term from '../infra/typeorm/entities/Term';

interface IRequest {
  term_slug: string;
  user_id: string;
  has_accepted: boolean;
}

@injectable()
class UpdateTermService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TermRepository')
    private termRepository: ITermRepository,
  ) {}

  public async execute({
    term_slug,
    user_id,
    has_accepted,
  }: IRequest): Promise<Term> {
    const foundUser = await this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('Only logged users can update terms');
    }

    const foundTerm = await this.termRepository.findByTermSlug(term_slug);

    if (!foundTerm) {
      throw new AppError('Term not found.', 404);
    }

    foundTerm.has_accepted = has_accepted;

    const term = await this.termRepository.save(foundTerm);

    return term;
  }
}

export default UpdateTermService;
