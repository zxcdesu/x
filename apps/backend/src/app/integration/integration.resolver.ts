import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { IntegrationRmq } from './integration.rmq';

@Resolver()
export class IntegrationResolver {
  constructor(private readonly rmq: IntegrationRmq) {}

  @Mutation(() => Boolean)
  createIntegration() {
    return this.rmq.create(undefined);
  }

  @Query(() => Boolean)
  findOneIntegration() {
    return this.rmq.findOne(undefined);
  }

  @Query(() => Boolean)
  findAllIntegrations() {
    return this.rmq.findAll(undefined);
  }

  @Mutation(() => Boolean)
  updateIntegration() {
    return this.rmq.update(undefined);
  }

  @Mutation(() => Boolean)
  removeIntegration() {
    return this.rmq.remove(undefined);
  }
}
