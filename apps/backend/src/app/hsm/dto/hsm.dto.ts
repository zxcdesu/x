import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AttachmentDto } from '../../message/dto/attachment.dto';
import { ButtonDto } from '../../message/dto/button.dto';
import { ApprovalDto } from './approval.dto';

@ObjectType()
export class HsmDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  text: string;

  @Field(() => [AttachmentDto])
  attachments: AttachmentDto[];

  @Field(() => [ButtonDto])
  buttons: ButtonDto[];

  @Field(() => [ApprovalDto])
  approval: ApprovalDto[];

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
