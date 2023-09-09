import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { CreateHsmDto } from './dto/create-hsm.dto';
import { HsmDto } from './dto/hsm.dto';
import { UpdateHsmDto } from './dto/update-hsm.dto';
import { HsmRmq } from './hsm.rmq';

@Resolver()
export class HsmResolver {
  constructor(private readonly rmq: HsmRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => HsmDto)
  createHsm(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateHsmDto,
  ): Promise<HsmDto> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => HsmDto)
  hsmById(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<HsmDto> {
    return this.rmq.findOne(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [HsmDto])
  hsm(@BearerAuthDecorator() auth: BearerAuth): Promise<HsmDto[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => HsmDto)
  updateHsm(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateHsmDto,
  ): Promise<HsmDto> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => HsmDto)
  removeHsm(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<HsmDto> {
    return this.rmq.remove(auth.project.id, id);
  }
}
