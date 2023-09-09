import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService<T extends object> {
  constructor(private readonly configService: ConfigService) {}

  sign(payload: T) {
    return sign(payload, this.configService.get('SECRET'));
  }

  verify(token: string) {
    return verify(token, this.configService.get('SECRET')) as T;
  }
}
