import ICreateTermDTO from '../dtos/ICreateTermDTO';

import Term from '../infra/typeorm/entities/Term';

export default interface ITermRepository {
  create(data: ICreateTermDTO): Promise<Term>;
  findByTermSlug(term_slug: string): Promise<Term | undefined>;
}
