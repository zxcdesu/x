import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const Ip = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<Request>();
  return request.headers['x-forwarded-for'] || request.ip;
});
