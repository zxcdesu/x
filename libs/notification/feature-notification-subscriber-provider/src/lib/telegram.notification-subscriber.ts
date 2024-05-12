import { NotImplementedException } from '@nestjs/common';
import { NotificationSubscriberDto } from '@zxcdesu/data-access-notification-subscriber';
import { AbstractNotificationSubscriber } from './abstract.notification-subscriber';
import { HandleNotificationSubscriberDto, NotifyDto } from './dto';

export class TelegramNotificationSubscriber extends AbstractNotificationSubscriber<unknown> {
  async notify(
    subscriber: NotificationSubscriberDto,
    payload: NotifyDto,
  ): Promise<void> {
    throw new NotImplementedException({
      subscriber,
      payload,
    });
  }

  async handleWebhook(
    payload: HandleNotificationSubscriberDto<{
      message?: {
        from: {
          id: number;
        };
        text: string;
      };
    }>,
  ): Promise<void> {
    if (payload.value.message?.text.startsWith('/start')) {
      const userId = Number(payload.value.message.text.slice(6));
      if (Number.isNaN(userId)) {
        return;
      }

      try {
        await this.prismaService.notificationSubscriber.update({
          where: {
            userId_provider: {
              userId,
              provider: payload.provider,
            },
          },
          data: {
            externalId: String(payload.value.message.from.id),
          },
        });
      } catch (error) {
        this.logger.error(error);
      }
    }
  }
}
