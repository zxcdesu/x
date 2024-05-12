import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { ProjectId } from '@zxcdesu/data-access-project';
import {
  CreateSubscriptionDto,
  SubscriptionDto,
  SubscriptionRmq,
  SubscriptionService,
  UpdateSubscriptionDto,
} from '@zxcdesu/data-access-subscription';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @SubscriptionRmq.create()
  @SerializeOptions({
    type: SubscriptionDto,
  })
  create(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: CreateSubscriptionDto,
  ): Promise<SubscriptionDto> {
    return this.subscriptionService.create(projectId, payload);
  }

  @SubscriptionRmq.findOne()
  @SerializeOptions({
    type: SubscriptionDto,
  })
  findOne(@ProjectId() projectId: number): Promise<SubscriptionDto> {
    return this.subscriptionService.findOne(projectId);
  }

  @SubscriptionRmq.update()
  @SerializeOptions({
    type: SubscriptionDto,
  })
  update(
    @ProjectId() projectId: number,
    @RabbitPayload() payload: UpdateSubscriptionDto,
  ): Promise<SubscriptionDto> {
    return this.subscriptionService.update(projectId, payload);
  }

  @SubscriptionRmq.remove()
  @SerializeOptions({
    type: SubscriptionDto,
  })
  remove(@ProjectId() projectId: number): Promise<SubscriptionDto> {
    return this.subscriptionService.remove(projectId);
  }
}
