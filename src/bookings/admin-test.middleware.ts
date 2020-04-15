import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';

import {Request, Response} from 'express';

@Injectable()
export class AdminTestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (req.body.passcode !== 'lol')
      return res.status(400).send(new BadRequestException());
    req.body.passcode = null;
    next();
  }
}
