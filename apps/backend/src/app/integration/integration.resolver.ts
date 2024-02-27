import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateIntegrationArgs } from './dto/create-integration.args';
import { IntegrationObject } from './dto/integration.object';
import { UpdateIntegrationArgs } from './dto/update-integration.args';
import { IntegrationRmq } from './integration.rmq';

@Resolver()
export class IntegrationResolver {
  constructor(private readonly rmq: IntegrationRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => IntegrationObject)
  createIntegration(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: CreateIntegrationArgs,
  ): Promise<IntegrationObject> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => IntegrationObject)
  integrationById(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<IntegrationObject> {
    return this.rmq.findOne(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [IntegrationObject])
  integrations(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
  ): Promise<IntegrationObject[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => IntegrationObject)
  updateIntegration(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: UpdateIntegrationArgs,
  ): Promise<IntegrationObject> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => IntegrationObject)
  removeIntegration(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<IntegrationObject> {
    return this.rmq.remove(auth.project.id, id);
  }
}
