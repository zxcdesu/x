import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../prisma/generated';

export {
  Approval,
  ApprovalStatus,
  AssignedTo,
  AssigneeType,
  Attachment,
  AttachmentType,
  Author,
  AuthorType,
  Channel,
  ChannelStatus,
  ChannelType,
  Chat,
  Contact,
  ContactField,
  ContactStatus,
  ContactTag,
  Content,
  Field,
  Hsm,
  Message,
  MessageStatus,
  Prisma,
  Tag,
} from '../../prisma/generated';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
