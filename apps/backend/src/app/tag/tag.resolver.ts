import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRmq } from './tag.rmq';

@Resolver()
export class HsmResolver {
  constructor(private readonly rmq: TagRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => TagDto)
  createHsm(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateTagDto,
  ): Promise<TagDto> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => TagDto)
  hsmById(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<TagDto> {
    return this.rmq.findOne(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [TagDto])
  hsm(@BearerAuthDecorator() auth: BearerAuth): Promise<TagDto[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => TagDto)
  updateHsm(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateTagDto,
  ): Promise<TagDto> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => TagDto)
  removeHsm(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<TagDto> {
    return this.rmq.remove(auth.project.id, id);
  }
}
