import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class BearerAuthGuard extends AuthGuard('bearer') {
  getRequest(context: ExecutionContext) {
    const { req } = GqlExecutionContext.create(context).getContext();
    return req;
  }
}
