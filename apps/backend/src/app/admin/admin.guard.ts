import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AdminRmq } from '@zxcdesu/data-access-admin';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly adminRmq: AdminRmq<boolean>) {}

  canActivate(context: ExecutionContext) {
    const { req } = GqlExecutionContext.create(context).getContext();
    return this.adminRmq.check(req.user.id);
  }
}
