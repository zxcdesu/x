import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { ContactDto } from '../contact/dto/contact.dto';
import { CustomFieldService } from './custom-field.service';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';

@Controller()
export class CustomFieldController {
  constructor(private readonly customFieldService: CustomFieldService) {}

  @RabbitRPC({
    routingKey: 'createCustomField',
    exchange: 'platform',
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
    routingKey: 'removeCustomField',
    exchange: 'platform',
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
