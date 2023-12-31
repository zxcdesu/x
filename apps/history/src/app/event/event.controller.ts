import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { CreateEventDto } from './dto/create-event.dto';
import { EventDto } from './dto/event.dto';
import { EventService } from './event.service';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @RabbitRPC({
    routingKey: 'createEvent',
    exchange: 'billing',
  })
  @SerializeOptions({
    type: EventDto,
  })
  create(@RabbitPayload() payload: CreateEventDto) {
    return this.eventService.create(payload);
  }

  @RabbitRPC({
    routingKey: 'findOneEvent',
    exchange: 'billing',
  })
  @SerializeOptions({
    type: EventDto,
  })
  findOne(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('userId', ParseIntPipe) userId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.eventService.findOne(projectId, userId, id);
  }

  @RabbitRPC({
    routingKey: 'findAllEvents',
    exchange: 'billing',
  })
  @SerializeOptions({
    type: EventDto,
  })
  findAll(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('userId', ParseIntPipe) userId: number,
  ) {
    return this.eventService.findAll(projectId, userId);
  }
}
