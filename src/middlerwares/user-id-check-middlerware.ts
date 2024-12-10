import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class UserdCheckMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    console.log('UserdCheckMiddleware', 'antes');

    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException('ID inválido!');
    }

    console.log('UserdCheckMiddleware', 'depois');

    next();
  }
}
