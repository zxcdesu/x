import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { verify } from 'jsonwebtoken';
import { Strategy } from 'passport-http-bearer';
import { BearerAuth } from './bearer-auth.interface';

@Injectable()
export class BearerAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  async validate(token: string): Promise<BearerAuth> {
    try {
      return verify(token, this.configService.get('SECRET')) as BearerAuth;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
