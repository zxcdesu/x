import { ArgsType, PartialType } from '@nestjs/graphql';
import type { UpdateProjectDto } from '@zxcdesu/data-access-project';
import { CreateProjectArgs } from './create-project.args';

@ArgsType()
export class UpdateProjectArgs
  extends PartialType(CreateProjectArgs)
  implements UpdateProjectDto {}
