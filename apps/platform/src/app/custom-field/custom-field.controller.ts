import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { ContactDto } from '../contact/dto/contact.dto';
import { CustomFieldService } from './custom-field.service';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';

@Controller()
export class CustomFieldController {
  constructor(private readonly customFieldService: CustomFieldService) {}

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'createCustomField',
    queue: 'platform.createCustomField',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  create(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload() payload: CreateCustomFieldDto,
  ) {
    return this.customFieldService.create(projectId, payload);
  }

  @RabbitRPC({
    exchange: 'platform',
    routingKey: 'removeCustomField',
    queue: 'platform.removeCustomField',
  })
  @SerializeOptions({
    type: ContactDto,
  })
  remove(
    @RabbitPayload('projectId', ParseIntPipe) projectId: number,
    @RabbitPayload('id', ParseIntPipe) id: number,
  ) {
    return this.customFieldService.remove(projectId, id);
  }
}
