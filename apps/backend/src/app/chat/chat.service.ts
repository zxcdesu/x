import { Injectable } from '@nestjs/common';
import { ContactService } from '../contact/contact.service';
import { ChatRmq } from './chat.rmq';
import { BearerAuth } from '../auth/bearer-auth.interface';

@Injectable()
export class ChatService {
  constructor(
    private readonly rmq: ChatRmq,
    private readonly contactService: ContactService,
  ) {}

  async findOneAndCheck(auth: BearerAuth, id: number) {
    const chat = await this.rmq.findOne(auth.project.id, id);
    this.contactService.check(auth.id, chat.contact.assignedTo);
    return chat;
  }
}
