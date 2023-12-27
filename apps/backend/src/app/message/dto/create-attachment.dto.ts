import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AttachmentType } from './attachment-type.enum';

@InputType('CreateAttachmentInput')
@ObjectType()
export class CreateAttachmentDto {
  @Field(() => String)
  url: string;

  @Field(() => AttachmentType)
  type: AttachmentType;

  @Field(() => String, { nullable: true })
  name?: string;
}
