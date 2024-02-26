import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreateInviteDto } from './dto/create-invite.dto';

@Injectable()
export class InviteRmq extends RmqService {
  create(projectId: number, payload: CreateInviteDto) {
    return this.request<boolean>({
      exchange: 'auth',
      routingKey: 'inviteProjectUser',
      payload: {
        projectId,
        ...payload,
      },
    });
  }
}
