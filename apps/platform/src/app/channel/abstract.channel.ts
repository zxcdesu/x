import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ChannelEvent } from '@platform/platform-type';
import { Channel, Prisma, PrismaService } from '../prisma.service';

export abstract class AbstractChannel<Q = unknown, B = unknown> {
  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService,
    protected readonly prismaService: PrismaService,
  ) {}

  abstract create(
    channel: Channel,
  ): Promise<Partial<Prisma.ChannelUncheckedUpdateInput>>;

  abstract event(channel: Channel, payload: ChannelEvent<Q, B>): Promise<void>;
}
