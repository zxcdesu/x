import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AttachmentDto } from './attachment.dto';
import { ButtonDto } from './button.dto';

@InputType('ContentInput')
@ObjectType()
export class ContentDto {
  @Field(() => String)
  text: string;

  @Field(() => [AttachmentDto])
  attachments: AttachmentDto[];

  @Field(() => ButtonDto)
  buttons: ButtonDto[];
}
