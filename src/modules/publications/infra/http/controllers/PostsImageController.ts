import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdatePostImageService from '@modules/publications/services/UpdatePostImageService';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.params;

    const updatePostImage = container.resolve(UpdatePostImageService);

    const post = await updatePostImage.execute({
      post_id,
      postFilename: request.file.filename,
    });

    return response.json(classToClass(post));
  }
}
