import { Injectable, NotImplementedException } from '@nestjs/common';
import { SendNotificationDto } from './dto/send-notification.dto';

@Injectable()
export class NotificationService {
  async send(payload: SendNotificationDto) {
    throw new NotImplementedException({
      payload,
    });
  }
}
