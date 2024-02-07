import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { ParseIntPipe } from '@nestjs/common';

export const ProjectId = () => RabbitPayload('projectId', ParseIntPipe);
