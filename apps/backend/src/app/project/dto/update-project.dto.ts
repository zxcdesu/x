import { ArgsType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateProjectDto } from './create-project.dto';

@ArgsType()
export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @Field(() => Int)
  id: number;
}