import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BearerAuthDecorator } from '../auth/bearer-auth.decorator';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';
import { BearerAuth } from '../auth/bearer-auth.interface';
import { ContactRmq } from './contact.rmq';
import { ContactService } from './contact.service';
import { AssigneeType } from './dto/assignee-type.enum';
import { CloseContactDto } from './dto/close-contact.dto';
import { ContactDto } from './dto/contact.dto';
import { CreateContactDto } from './dto/create-contact.dto';
import { EnqueueContactDto } from './dto/enqueue-contact.dto';
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
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: CreateContactDto,
  ): Promise<ContactDto> {
    return this.rmq.create(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => ContactDto)
  contactById(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ContactDto> {
    return this.contactService.findOneAndCheck(auth, id);
  }

  @UseGuards(BearerAuthGuard)
  @Query(() => [ContactDto])
  contacts(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
  ): Promise<ContactDto[]> {
    return this.rmq.findAll(auth.project.id, {
      id: auth.id,
      type: AssigneeType.User,
    });
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ContactDto)
  async updateContact(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: UpdateContactDto,
  ): Promise<ContactDto> {
    await this.contactService.findOneAndCheck(auth, payload.id);
    return this.rmq.update(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ContactDto)
  async removeContact(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ContactDto> {
    await this.contactService.findOneAndCheck(auth, id);
    return this.rmq.remove(auth.project.id, id);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ContactDto)
  async enqueueContact(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: EnqueueContactDto,
  ): Promise<ContactDto> {
    await this.contactService.findOneAndCheck(auth, payload.id);
    return this.rmq.enqueue(auth.project.id, payload);
  }

  @UseGuards(BearerAuthGuard)
  @Mutation(() => ContactDto)
  async closeContact(
    @BearerAuthDecorator() auth: Required<BearerAuth>,
    @Args() payload: CloseContactDto,
  ): Promise<ContactDto> {
    await this.contactService.findOneAndCheck(auth, payload.id);
    return this.rmq.close(auth.project.id, payload);
  }
}
