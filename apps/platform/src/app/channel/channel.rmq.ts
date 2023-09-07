import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelStatus } from '../prisma.service';

@Injectable()
export class ChannelRmq extends RmqService {
  create(payload: CreateChannelDto) {
    return this.request<{
      accountId: string;
      token: any;
      status: ChannelStatus;
      failedReason?: string;
    }>({
      exchange: `platform-${payload.type.toLowerCase()}`,
      routingKey: 'createChannel',
      payload,
    });
  }
}
