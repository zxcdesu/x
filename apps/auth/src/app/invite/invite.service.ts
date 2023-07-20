import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class InviteService {
  async create() {
    throw new NotImplementedException();
  }
}
