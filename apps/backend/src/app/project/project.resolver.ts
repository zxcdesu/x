import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { TokenDto } from '../auth/dto/token.dto';
import { CreateProjectArgs } from './dto/create-project.args';
import { ProjectObject } from './dto/project.object';
import { UpdateProjectArgs } from './dto/update-project.args';
import { ProjectRmq } from './project.rmq';

@Resolver()
export class ProjectResolver {
  constructor(private readonly rmq: ProjectRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectObject)
  createProject(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateProjectArgs,
  ): Promise<ProjectObject> {
    return this.rmq.create(auth.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => ProjectObject)
  project(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
  ): Promise<ProjectObject> {
    return this.rmq.findOne(auth.id, auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [ProjectObject])
  projects(@BearerAuthDecorator() auth: BearerAuth): Promise<ProjectObject[]> {
    return this.rmq.findAll(auth.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectObject)
  updateProject(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: UpdateProjectArgs,
  ): Promise<ProjectObject> {
    return this.rmq.update(auth.id, auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ProjectObject)
  removeProject(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
  ): Promise<ProjectObject> {
    return this.rmq.remove(auth.id, auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => TokenDto)
  signInProject(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<TokenDto> {
    return this.rmq.signIn(auth.id, id);
  }
}
