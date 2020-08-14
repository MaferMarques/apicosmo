import ITermRepository from '@modules/users/repositories/ITermRepository';
import ICreateTermDTO from '@modules/users/dtos/ICreateTermDTO';

import Term from '@modules/users/infra/typeorm/entities/Term';

import { uuid } from 'uuidv4';

class FakeTermRepository implements ITermRepository {
  private terms: Term[] = [];

  public async create(termData: ICreateTermDTO): Promise<Term> {
    const term = new Term();

    Object.assign(term, { id: uuid() }, termData);

    this.terms.push(term);

    return term;
  }

  public async findByTermSlug(term_slug: string): Promise<Term | undefined> {
    const foundTerm = this.terms.find((term) => term.term_slug === term_slug);

    return foundTerm;
  }
}

export default FakeTermRepository;
