import { ChannelType } from '@zxcdesu/prisma-platform';
import { ClientOptions } from './client-options.interface';

export interface FactoryOptions extends ClientOptions {
  type: ChannelType;
}
