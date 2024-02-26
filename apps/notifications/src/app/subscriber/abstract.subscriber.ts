import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import { HandleSubscriberDto } from './dto/handle-subscriber.dto';
import { NotifySubscriberDto } from './dto/notify-subscriber.dto';
import { SubscriberDto } from './dto/subscriber.dto';

export abstract class AbstractSubscriber<T = unknown> {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(
    protected readonly configService: ConfigService,
    protected readonly httpService: HttpService,
    protected readonly prismaService: PrismaService,
  ) {}

  abstract notify(
    subscriber: SubscriberDto,
    payload: NotifySubscriberDto,
  ): Promise<void>;

  abstract handleWebhook(payload: HandleSubscriberDto<T>): Promise<void>;
}
