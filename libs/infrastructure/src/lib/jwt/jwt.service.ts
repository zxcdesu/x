import { Inject, Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { JwtModuleOptions } from './jwt-module-options.interface';
import { MODULE_OPTIONS_TOKEN } from './jwt.module-definition';

@Injectable()
export class JwtService<T extends object> {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: JwtModuleOptions,
  ) {}

  sign(payload: T) {
    return sign(payload, this.options.secret);
  }

  verify(token: string) {
    return verify(token, this.options.secret) as T;
  }
}
