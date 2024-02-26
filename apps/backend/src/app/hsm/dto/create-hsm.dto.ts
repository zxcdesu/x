import { ArgsType, Field } from '@nestjs/graphql';
import { AttachmentDto } from '../../message/dto/attachment.dto';
import { ButtonDto } from '../../message/dto/button.dto';

@ArgsType()
export class CreateHsmDto {
  @Field(() => String)
  name: string;

  @Field(() => String)
  text: string;

  @Field(() => [AttachmentDto])
  attachments: AttachmentDto[];

  @Field(() => [ButtonDto])
  buttons: ButtonDto[];
}
