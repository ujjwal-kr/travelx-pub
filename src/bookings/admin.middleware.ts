import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(req.headers.authorization);
    try{
      const token = req.headers.authorization.split(' ')
      const decoded:any = jwt.verify(token[1], 'secret');
      if (decoded.role == 'admin') return next()
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
    } catch(e) {
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
