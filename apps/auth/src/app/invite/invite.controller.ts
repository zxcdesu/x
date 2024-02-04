import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { CreateInviteDto } from './dto/create-invite.dto';
import { InviteService } from './invite.service';

@Controller()
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'createInvite',
    queue: 'auth.createInvite',
  })
  create(@RabbitPayload() payload: CreateInviteDto): Promise<boolean> {
    return this.inviteService.create(payload);
  }
}
