import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRmq } from './project.rmq';

@Resolver()
export class ProjectResolver {
  constructor(private readonly rmq: ProjectRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectDto)
  createProject(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateProjectDto,
  ): Promise<ProjectDto> {
    return this.rmq.create(auth.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => ProjectDto)
  currentProject(@BearerAuthDecorator() auth: BearerAuth): Promise<ProjectDto> {
    return this.rmq.findOne(auth.id, auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => ProjectDto)
  projects(@BearerAuthDecorator() auth: BearerAuth): Promise<ProjectDto[]> {
    return this.rmq.findAll(auth.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectDto)
  updateProject(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateProjectDto,
  ): Promise<ProjectDto> {
    return this.rmq.update(auth.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectDto)
  removeProject(@BearerAuthDecorator() auth: BearerAuth): Promise<ProjectDto> {
    return this.rmq.remove(auth.id, auth.project.id);
  }
}
