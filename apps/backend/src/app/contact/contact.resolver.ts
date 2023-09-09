import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { ContactRmq } from './contact.rmq';
import { ContactDto } from './dto/contact.dto';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Resolver()
export class ContactResolver {
  constructor(private readonly rmq: ContactRmq) {}

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ContactDto)
  createContact(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: CreateContactDto,
  ): Promise<ContactDto> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => ContactDto)
  contactById(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ContactDto> {
    return this.rmq.findOne(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [ContactDto])
  contacts(@BearerAuthDecorator() auth: BearerAuth): Promise<ContactDto[]> {
    return this.rmq.findAll(auth.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ContactDto)
  updateContact(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateContactDto,
  ): Promise<ContactDto> {
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ContactDto)
  removeContact(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ContactDto> {
    return this.rmq.remove(auth.project.id, id);
  }
}
