import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectRmq } from './project.rmq';

@Resolver()
export class ProjectResolver {
  constructor(private readonly rmq: ProjectRmq) {}

  @Mutation(() => Boolean)
  createProject() {
    return this.rmq.create(undefined);
  }

  @Query(() => Boolean)
  findOneProject() {
    return this.rmq.findOne(undefined);
  }

  @Query(() => Boolean)
  findAllProjects() {
    return this.rmq.findAll(undefined);
  }

  @Mutation(() => Boolean)
  updateProject() {
    return this.rmq.update(undefined);
  }

  @Mutation(() => Boolean)
  removeProject() {
    return this.rmq.remove(undefined);
  }
}
