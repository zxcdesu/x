import { registerEnumType } from '@nestjs/graphql';
import { ChannelStatus } from '@zxcdesu/prisma-platform';

registerEnumType(ChannelStatus, {
  name: 'ChannelStatus',
});

export { ChannelStatus };
