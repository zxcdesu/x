import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateInviteDto } from './invite.dto';

@Injectable()
export class InviteService {
  async create(payload: CreateInviteDto) {
    throw new NotImplementedException();
  }
}
