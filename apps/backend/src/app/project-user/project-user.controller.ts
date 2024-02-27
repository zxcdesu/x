import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { ProjectUserObject } from './dto/project-user.object';
import { UpdateProjectUserArgs } from './dto/update-project-user.args';
import { ProjectUserRmq } from './project-user.rmq';

@Resolver()
export class ProjectUserResolver {
  constructor(private readonly rmq: ProjectUserRmq) {}

  @UseGuards(BearerAuthGuard)
  @Query(() => ProjectUserObject)
  projectUserById(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<ProjectUserObject> {
    return this.rmq.findOne(auth.project.id, userId);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [ProjectUserObject])
  projectUsers(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
  ): Promise<ProjectUserObject[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectUserObject)
  updateProjectUser(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: UpdateProjectUserArgs,
  ): Promise<ProjectUserObject> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectUserObject)
  removeProjectUser(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<ProjectUserObject> {
    return this.rmq.remove(auth.project.id, userId);
  }
}
