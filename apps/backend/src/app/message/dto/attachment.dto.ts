import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AttachmentType } from './attachment-type.enum';

@InputType('AttachmentInput')
@ObjectType()
export class AttachmentDto {
  @Field(() => String)
  url: string;

  @Field(() => AttachmentType)
  type: AttachmentType;

  @Field(() => String, { nullable: true })
  name?: string;
}
