import { FieldDto } from '@zxcdesu/data-access-field';
import { ContactField } from '@zxcdesu/prisma-platform';
import { Exclude, Type } from 'class-transformer';

export class ContactFieldDto implements ContactField {
  @Exclude()
  contactId: number;

  @Exclude()
  fieldId: number;

  @Type(() => FieldDto)
  field: FieldDto;

  value: string | null;
}
