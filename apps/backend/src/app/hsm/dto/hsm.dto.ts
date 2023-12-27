import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CreateAttachmentDto } from '../../message/dto/create-attachment.dto';
import { CreateButtonDto } from '../../message/dto/create-button.dto';
import { ApprovalDto } from './approval.dto';

@ObjectType()
export class HsmDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  code: string;

  @Field(() => String)
  text: string;

  @Field(() => [CreateAttachmentDto])
  attachments: CreateAttachmentDto[];

  @Field(() => [CreateButtonDto])
  buttons: CreateButtonDto[];

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => ApprovalDto, { nullable: true })
  approval?: ApprovalDto;
}
