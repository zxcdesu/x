import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { CreateInviteArgs } from './dto/create-invite.args';

@Injectable()
export class InviteRmq extends RmqService {
  invite(projectId: number, payload: CreateInviteArgs) {
    return this.request<boolean>({
      exchange: 'auth',
      routingKey: 'inviteUserToProject',
      payload: {
        projectId,
        ...payload,
      },
    });
  }
}
