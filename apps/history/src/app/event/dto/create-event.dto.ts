import {
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { EventType, Prisma } from '../../prisma.service';

export class CreateEventDto implements Prisma.EventUncheckedCreateInput {
  @ValidateIf((object: CreateEventDto) => object.userId == null)
  @IsInt()
  projectId?: number;

  @ValidateIf((object: CreateEventDto) => object.projectId == null)
  @IsInt()
  userId?: number;

  @IsEnum(EventType)
  type: EventType;

  @IsOptional()
  @IsObject()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}
