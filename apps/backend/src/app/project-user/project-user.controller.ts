import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { ProjectUserDto } from './dto/project-user.dto';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';
import { ProjectUserRmq } from './project-user.rmq';

@Resolver()
export class ProjectUserResolver {
  constructor(private readonly rmq: ProjectUserRmq) {}

  @UseGuards(BearerAuthGuard)
  @Query(() => ProjectUserDto)
  projectUserById(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<ProjectUserDto> {
    return this.rmq.findOne(auth.project.id, userId);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [ProjectUserDto])
  projectUsers(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
  ): Promise<ProjectUserDto[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectUserDto)
  updateProjectUser(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: UpdateProjectUserDto,
  ): Promise<ProjectUserDto> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectUserDto)
  removeProjectUser(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<ProjectUserDto> {
    return this.rmq.remove(auth.project.id, userId);
  }
}
