import { Injectable, NotImplementedException } from '@nestjs/common';
import { SendNotificationDto } from './dto';

@Injectable()
export class NotificationSenderService {
  async send(payload: SendNotificationDto) {
    throw new NotImplementedException({
      payload,
    });
  }
}
