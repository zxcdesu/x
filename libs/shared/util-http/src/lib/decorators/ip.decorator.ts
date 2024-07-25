import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const Ip = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<FastifyRequest>();
  return request.headers['x-forwarded-for'] || request.ip;
});
