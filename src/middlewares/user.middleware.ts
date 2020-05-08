import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { KEY } from 'src/secret';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    try {
      const token = req.headers.authorization.split(' ');
      const decoded: any = jwt.verify(token[1], KEY);
      req.body.userId = decoded.id;
      let isAdmin = true;
      if (decoded.role != 'admin') isAdmin = false;
      req.body.isAdmin = isAdmin;
      return next();
    } catch (e) {
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
