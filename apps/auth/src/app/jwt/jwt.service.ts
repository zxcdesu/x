import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService<T extends object> {
  private readonly secret = this.configService.get('SECRET');

  constructor(private readonly configService: ConfigService) {}

  sign(payload: T): string {
    return sign(payload, this.secret);
  }

  verify(token: string): T {
    return verify(token, this.secret) as T;
  }
}
