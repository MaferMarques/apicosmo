import ITermRepository from '@modules/users/repositories/ITermRepository';
import ICreateTermDTO from '@modules/users/dtos/ICreateTermDTO';

import Term from '@modules/users/infra/typeorm/entities/Term';

import { uuid } from 'uuidv4';

class FakeTermRepository implements ITermRepository {
  private terms: Term[] = [];

  public async create(termData: ICreateTermDTO): Promise<Term> {
    const term = new Term();

    Object.assign(term, { id: uuid(), has_accepted: false }, termData);

    this.terms.push(term);

    return term;
  }

  public async findByTermSlug(term_slug: string): Promise<Term | undefined> {
    const foundTerm = this.terms.find((term) => term.term_slug === term_slug);

    return foundTerm;
  }

  public async findByTermSlugAndUserId(
    term_slug: string,
    user_id: string,
  ): Promise<Term | undefined> {
    const foundTerm = this.terms.find(
      (term) => term.term_slug === term_slug && term.user_id === user_id,
    );

    return foundTerm;
  }

  public async save(term: Term): Promise<Term> {
    const findIndex = this.terms.findIndex(
      (findTerm) => findTerm.id === term.id,
    );

    this.terms[findIndex] = term;

    return term;
  }
}

export default FakeTermRepository;
