import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotifyDto } from './dto/notify.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prismaService: PrismaService) {}

  notify(payload: NotifyDto) {
    // TODO
    // 1 если есть projectId:
    // получить список участников проекта (auth.findAllProjectUsers)
    // найти подписчиков на уведомления
    // отсортировать только тех, которые подписаны на конкретное событие
    // разослать уведомление
    // 2 если userId:
    // найти подписка
    // проверить, подписан ли он на событие
    // отослать уведомление

    throw new NotImplementedException({
      payload,
    });
  }
}
