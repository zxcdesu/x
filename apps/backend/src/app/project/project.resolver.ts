import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectRmq } from '@zxcdesu/data-access-project';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { CreateProjectArgs, ProjectObject, UpdateProjectArgs } from './dto';

@Resolver()
export class ProjectResolver {
  constructor(private readonly projectRmq: ProjectRmq<ProjectObject>) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectObject)
  createProject(
    @Args('userId', ParseIntPipe) userId: number,
    @Args() payload: CreateProjectArgs,
  ): Promise<ProjectObject> {
    return this.projectRmq.create(userId, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectObject)
  projectById(
    @Args('userId', ParseIntPipe) userId: number,
    @Args('id') id: number,
  ): Promise<ProjectObject> {
    return this.projectRmq.findOne(userId, id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectObject)
  projects(
    @Args('userId', ParseIntPipe) userId: number,
  ): Promise<ProjectObject[]> {
    return this.projectRmq.findAll(userId);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectObject)
  updateProject(
    @Args('userId', ParseIntPipe) userId: number,
    @Args('id') id: number,
    @Args() payload: UpdateProjectArgs,
  ): Promise<ProjectObject> {
    return this.projectRmq.update(userId, id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectObject)
  removeProject(
    @Args('userId', ParseIntPipe) userId: number,
    @Args('id') id: number,
  ): Promise<ProjectObject> {
    return this.projectRmq.remove(userId, id);
  }
}
