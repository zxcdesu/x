import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AttachmentDto } from '../../message/dto/attachment.dto';
import { ButtonDto } from '../../message/dto/button.dto';
import { ApprovalDto } from './approval.dto';

@ObjectType()
export class HsmDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  code: string;

  @Field(() => String)
  text: string;

  @Field(() => [AttachmentDto])
  attachments: AttachmentDto[];

  @Field(() => [ButtonDto])
  buttons: ButtonDto[];

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => [ApprovalDto])
  approval: ApprovalDto[];
}
