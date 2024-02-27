import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { ProjectUser } from './dto/project-user.entity';
import { UpdateProjectUserArgs } from './dto/update-project-user.args';
import { ProjectUserRmq } from './project-user.rmq';

@Resolver()
export class ProjectUserResolver {
  constructor(private readonly rmq: ProjectUserRmq) {}

  @UseGuards(BearerAuthGuard)
  @Query(() => ProjectUser)
  projectUserById(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<ProjectUser> {
    return this.rmq.findOne(auth.project.id, userId);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [ProjectUser])
  projectUsers(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
  ): Promise<ProjectUser[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectUser)
  updateProjectUser(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: UpdateProjectUserArgs,
  ): Promise<ProjectUser> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectUser)
  removeProjectUser(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<ProjectUser> {
    return this.rmq.remove(auth.project.id, userId);
  }
}
