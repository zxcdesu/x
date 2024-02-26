import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { BearerAuth } from './bearer-auth.interface';

@Injectable()
export class BearerAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const { req } = GqlExecutionContext.create(context).getContext<{
      req: Request & {
        user: BearerAuth;
      };
    }>();

    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      req.user = await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    if (request.headers.authorization) {
      const [type, token] = request.headers.authorization.split(' ');
      if (type.toLowerCase() === 'bearer') {
        return token;
      }
    }
  }
}
