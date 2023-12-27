import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AssignedToDto } from './assigned-to.dto';
import { ContactStatus } from './contact-status.enum';
import { ContactTagDto } from './contact-tag.dto';
import { CustomFieldDto } from './custom-field.dto';

@ObjectType()
export class ContactDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => Int)
  priority: number;

  @Field(() => ContactStatus)
  status: ContactStatus;

  @Field(() => String, { nullable: true })
  rejectedReason?: string;

  @Field(() => String, { nullable: true })
  createdAt: string;

  @Field(() => String, { nullable: true })
  updatedAt: string;

  @Field(() => AssignedToDto, { nullable: true })
  assignedTo?: AssignedToDto;

  @Field(() => [CustomFieldDto])
  customFields: CustomFieldDto[];

  @Field(() => [ContactTagDto])
  tags: ContactTagDto[];
}
