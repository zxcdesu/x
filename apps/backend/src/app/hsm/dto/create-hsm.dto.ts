import { ArgsType, Field } from '@nestjs/graphql';
import { CreateAttachmentDto } from '../../message/dto/create-attachment.dto';
import { CreateButtonDto } from '../../message/dto/create-button.dto';

@ArgsType()
export class CreateHsmDto {
  @Field(() => String)
  code: string;

  @Field(() => String)
  text: string;

  @Field(() => [CreateAttachmentDto])
  attachments: CreateAttachmentDto[];

  @Field(() => [CreateButtonDto])
  buttons: CreateButtonDto[];
}
