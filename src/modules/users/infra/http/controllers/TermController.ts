import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateTermService from '@modules/users/services/CreateTermService';
import ListTermService from '@modules/users/services/ListTermService';
import UpdateTermService from '@modules/users/services/UpdateTermService';

export default class TermController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { term_slug } = request.body;
    const user_id = request.user.id;

    const createTerm = container.resolve(CreateTermService);

    const term = await createTerm.execute({
      term_slug,
      user_id,
    });

    return response.json(classToClass(term));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { term_slug } = request.params;
    const user_id = request.user.id;

    const listTerm = container.resolve(ListTermService);

    const term = await listTerm.execute({
      term_slug,
      user_id,
    });

    return response.json(classToClass(term));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { term_slug } = request.params;
    const { has_accepted } = request.body;
    const user_id = request.user.id;

    const updateTerm = container.resolve(UpdateTermService);

    const term = await updateTerm.execute({
      term_slug,
      user_id,
      has_accepted,
    });

    return response.json(classToClass(term));
  }
}
