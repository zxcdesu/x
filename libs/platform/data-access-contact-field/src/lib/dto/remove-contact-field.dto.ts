import { IsInt } from 'class-validator';

export class RemoveContactFieldDto {
  @IsInt()
  contactId: number;

  @IsInt()
  fieldId: number;
}
