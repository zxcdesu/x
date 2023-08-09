import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class TokenService<T extends {}> {
  private readonly secret: string;

  constructor(configService: ConfigService) {
    this.secret = configService.get('SECRET');
  }

  sign(payload: T) {
    return sign(payload, this.secret);
  }

  verify(token: string): T {
    return verify(token, this.secret) as T;
  }
}
