import { Exclude } from 'class-transformer';
import { CustomField } from '../../prisma.service';
import { CreateCustomFieldDto } from './create-custom-field.dto';

export class CustomFieldDto
  extends CreateCustomFieldDto
  implements CustomField
{
  @Exclude()
  id: number;

  @Exclude()
  contactId: number;
}
