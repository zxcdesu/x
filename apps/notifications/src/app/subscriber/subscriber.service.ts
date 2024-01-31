import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { HandleWebhookDto } from './dto/handle-webhook.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';

@Injectable()
export class SubscriberService {
  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateSubscriberDto) {
    return this.prismaService.subscriber.create({
      data: payload,
    });
  }

  findOne(userId: number) {
    return this.prismaService.subscriber.findUniqueOrThrow({
      where: {
        userId,
      },
    });
  }

  update(payload: UpdateSubscriberDto) {
    return this.prismaService.subscriber.update({
      where: {
        userId: payload.userId,
      },
      data: payload,
    });
  }

  remove(userId: number) {
    return this.prismaService.subscriber.delete({
      where: {
        userId,
      },
    });
  }

  handleWebhook(
    payload: HandleWebhookDto<{
      message?: {
        from: {
          id: number;
        };
        text: string;
      };
    }>,
  ) {
    if (payload.value.message?.text.startsWith('/start')) {
      const userId = Number(payload.value.message.text.slice(6));
      if (Number.isNaN(userId)) {
        return;
      }

      this.prismaService.subscriber
        .update({
          where: {
            userId,
          },
          data: {
            externalId: String(payload.value.message.from.id),
          },
        })
        .catch(() => {});
    }
  }
}
