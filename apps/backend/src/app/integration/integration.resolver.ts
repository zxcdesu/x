import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { IntegrationDto } from './dto/integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';
import { IntegrationRmq } from './integration.rmq';

@Resolver()
export class IntegrationResolver {
  constructor(private readonly rmq: IntegrationRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => IntegrationDto)
  createIntegration(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateIntegrationDto,
  ): Promise<IntegrationDto> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => IntegrationDto)
  integrationById(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<IntegrationDto> {
    return this.rmq.findOne(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [IntegrationDto])
  integrations(
    @BearerAuthDecorator() auth: BearerAuth,
  ): Promise<IntegrationDto[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => IntegrationDto)
  updateIntegration(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateIntegrationDto,
  ): Promise<IntegrationDto> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => IntegrationDto)
  removeIntegration(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<IntegrationDto> {
    return this.rmq.remove(auth.project.id, id);
  }
}
