import { ChannelType } from '@zxcdesu/prisma-platform';

export interface FactoryOptions<T = unknown> {
  type: ChannelType;
  externalId: string;
  token: T;
}
