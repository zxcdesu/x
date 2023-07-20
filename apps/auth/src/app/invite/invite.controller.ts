import { Controller } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { InviteService } from './invite.service';
import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { CreateInviteDto } from './invite.dto';

@Controller()
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @RabbitRPC({
    routingKey: 'createInvite',
  })
  create(@RabbitPayload() payload: CreateInviteDto) {
    return this.inviteService.create(payload);
  }
}
