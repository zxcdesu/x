import { Module } from '@nestjs/common';
import { PrismaService } from 'apps/platform/prisma/prisma.service';
import { ChannelController } from './channel/channel.controller';
import { ChannelService } from './channel/channel.service';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';

@Module({
  imports: [],
  controllers: [
    ChannelController,
    ChatController,
    ContactController,
    MessageController,
  ],
  providers: [
    PrismaService,
    ChannelService,
    ChatService,
    ContactService,
    MessageService,
  ],
})
export class AppModule {}
