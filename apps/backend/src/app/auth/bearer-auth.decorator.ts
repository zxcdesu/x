import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FastifyRequest } from 'fastify';
import { BearerAuth } from './bearer-auth.interface';

export const BearerAuthDecorator = createParamDecorator(
  (_, context: ExecutionContext) => {
    const { req } = GqlExecutionContext.create(context).getContext<{
      req: FastifyRequest & {
        auth: BearerAuth;
      };
    }>();

    return req.auth;
  },
);
