import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { ContactRmq } from './contact.rmq';
import { ContactService } from './contact.service';
import { AssignContactDto } from './dto/assign-contact.dto';
import { AssigneeType } from './dto/assignee-type.enum';
import { ContactDto } from './dto/contact.dto';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Resolver()
export class ContactResolver {
  constructor(
    private readonly contactService: ContactService,
    private readonly rmq: ContactRmq,
  ) {}

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
    return this.contactService.findOneAndCheck(auth, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [ContactDto])
  contacts(@BearerAuthDecorator() auth: BearerAuth): Promise<ContactDto[]> {
    return this.rmq.findAll(auth.project.id, {
      id: auth.id,
      type: AssigneeType.User,
    });
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ContactDto)
  async updateContact(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: UpdateContactDto,
  ): Promise<ContactDto> {
    await this.contactService.findOneAndCheck(auth, payload.id);
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ContactDto)
  async removeContact(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ContactDto> {
    await this.contactService.findOneAndCheck(auth, id);
    return this.rmq.remove(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ContactDto)
  async assignContact(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args() payload: AssignContactDto,
  ): Promise<ContactDto> {
    await this.contactService.findOneAndCheck(auth, payload.id);
    return this.rmq.assign(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ContactDto)
  async resolveContact(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ContactDto> {
    await this.contactService.findOneAndCheck(auth, id);
    return this.rmq.resolve(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ContactDto)
  async rejectContact(
    @BearerAuthDecorator() auth: BearerAuth,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ContactDto> {
    await this.contactService.findOneAndCheck(auth, id);
    return this.rmq.reject(auth.project.id, id);
  }
}
