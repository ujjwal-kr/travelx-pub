import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { KEY } from 'src/secret';

@Injectable()
export class RoleGuardMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    try {
      const token = req.headers.authorization.split(' ');
      const decoded: any = jwt.verify(token[1], KEY);
      const userId = decoded.userId;
      req.body.claimedUser = userId;
      return next();
    } catch {
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
