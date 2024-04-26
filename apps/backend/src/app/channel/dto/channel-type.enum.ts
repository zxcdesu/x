import { registerEnumType } from '@nestjs/graphql';
import { ChannelType } from '@zxcdesu/prisma-platform';

registerEnumType(ChannelType, {
  name: 'ChannelType',
});

export { ChannelType };
