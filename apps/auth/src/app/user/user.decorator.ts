import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { ParseIntPipe } from '@nestjs/common';

export const UserId = () => RabbitPayload('userId', ParseIntPipe);
