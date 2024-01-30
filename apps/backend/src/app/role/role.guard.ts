import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RoleDecorator } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(RoleDecorator, context.getHandler());
    if (roles?.length) {
      const gqlContext = GqlExecutionContext.create(context).getContext();
      return roles.some((role) =>
        gqlContext.req.user.project.roles.includes(role),
      );
    }

    return true;
  }
}
