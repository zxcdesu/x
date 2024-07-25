import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import type { FastifyRequest } from 'fastify';
import { mapKeys } from 'lodash';
import { BearerAuth } from './bearer-auth.interface';

@Injectable()
export class BearerAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const { req } = GqlExecutionContext.create(context).getContext<{
      req: FastifyRequest & {
        auth: BearerAuth;
      };
    }>();

    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      req.auth = await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: FastifyRequest) {
    const headers = mapKeys(request.headers, (_, header) => {
      return header.toLowerCase();
    });

    if (typeof headers.authorization === 'string') {
      const [type, token] = headers.authorization.split(' ');
      if (type.toLowerCase() === 'bearer') {
        return token;
      }
    }
  }
}
