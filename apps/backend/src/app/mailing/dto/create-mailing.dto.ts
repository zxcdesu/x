import { ArgsType, Field, Int } from '@nestjs/graphql';
import { MailingStatus } from './mailing-status.enum';

@ArgsType()
export class CreateMailingDto {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  color: string;

  @Field(() => Int)
  channelId: number;

  @Field(() => [Int])
  tagIds: number[];

  @Field(() => [Int])
  hsmIds: number[];

  @Field(() => MailingStatus)
  status?: MailingStatus;

  @Field(() => String, { nullable: true })
  scheduledAt?: string;
}
