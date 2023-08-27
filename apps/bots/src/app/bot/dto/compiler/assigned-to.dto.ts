import { IsEnum, IsInt } from 'class-validator';

export enum AssigneeType {
  User = 'User',
  Bot = 'Bot',
}

export class AssignedTo {
  @IsInt()
  id: number;

  @IsEnum(AssigneeType)
  type: AssigneeType;
}
