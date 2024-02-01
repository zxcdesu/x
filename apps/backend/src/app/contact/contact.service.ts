import { ForbiddenException, Injectable } from '@nestjs/common';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { ContactRmq } from './contact.rmq';
import { AssignedToDto } from './dto/assigned-to.dto';
import { AssigneeType } from './dto/assignee-type.enum';

@Injectable()
export class ContactService {
  constructor(private readonly rmq: ContactRmq) {}

  async findOneAndCheck(auth: BearerAuth, id: number) {
    const contact = await this.rmq.findOne(auth.project.id, id);
    this.check(auth.id, contact.assignedTo);
    return contact;
  }

  check(userId: number, assignedTo?: AssignedToDto) {
    if (assignedTo) {
      if (assignedTo.id !== userId && assignedTo.type === AssigneeType.User) {
        throw new ForbiddenException();
      }
    }
  }
}
