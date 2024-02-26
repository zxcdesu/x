import { Type } from 'class-transformer';
import { FieldDto } from '../../field/dto/field.dto';

export class ContactFieldDto {
  @Type(() => FieldDto)
  field: FieldDto;
}
