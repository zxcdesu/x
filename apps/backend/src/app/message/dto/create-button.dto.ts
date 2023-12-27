import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ButtonType } from './button-type.enum';

@InputType('CreateButtonInput')
@ObjectType()
export class CreateButtonDto {
  @Field(() => ButtonType)
  type: ButtonType;

  @Field(() => String)
  text: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => String, { nullable: true })
  phone?: string;
}
