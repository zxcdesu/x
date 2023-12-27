import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AuthorDto } from './author.dto';
import { ContentDto } from './content.dto';
import { MessageStatus } from './message-status.enum';

@ObjectType()
export class MessageDto {
  @Field(() => Int)
  id: number;

  @Field(() => MessageStatus)
  status: MessageStatus;

  @Field(() => String, { nullable: true })
  failedReason?: string;

  @Field(() => AuthorDto)
  author: AuthorDto;

  @Field(() => [ContentDto])
  content: ContentDto[];

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
