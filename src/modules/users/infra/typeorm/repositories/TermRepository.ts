import { getRepository, Repository } from 'typeorm';

import ITermRepository from '@modules/users/repositories/ITermRepository';
import ICreateTermDTO from '@modules/users/dtos/ICreateTermDTO';

import Term from '../entities/Term';

class TermRepository implements ITermRepository {
  private ormRepository: Repository<Term>;

  constructor() {
    this.ormRepository = getRepository(Term);
  }

  public async create(termData: ICreateTermDTO): Promise<Term> {
    const term = this.ormRepository.create(termData);

    await this.ormRepository.save(term);

    return term;
  }

  public async findByTermSlug(term_slug: string): Promise<Term | undefined> {
    const foundTerm = this.ormRepository.findOne({
      where: { term_slug },
    });

    return foundTerm;
  }

  public async findByTermSlugAndUserId(
    term_slug: string,
    user_id: string,
  ): Promise<Term | undefined> {
    const foundTerm = this.ormRepository.findOne({
      where: { term_slug, user_id },
    });

    return foundTerm;
  }
}

export default TermRepository;
