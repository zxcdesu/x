import { NotImplementedException } from '@nestjs/common';
import { AbstractSubscriber } from './abstract.subscriber';
import { HandleSubscriberDto } from './dto/handle-subscriber.dto';
import { NotifySubscriberDto } from './dto/notify-subscriber.dto';
import { SubscriberDto } from './dto/subscriber.dto';

export class TelegramSubscriber extends AbstractSubscriber<unknown> {
  async notify(
    subscriber: SubscriberDto,
    payload: NotifySubscriberDto,
  ): Promise<void> {
    throw new NotImplementedException({
      subscriber,
      payload,
    });
  }

  async handleWebhook(
    payload: HandleSubscriberDto<{
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
        await this.prismaService.subscriber.update({
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
