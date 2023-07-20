import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContactRmq } from './contact.rmq';

@Resolver()
export class ContactResolver {
  constructor(private readonly rmq: ContactRmq) {}

  @Mutation(() => Boolean)
  createContact() {
    return this.rmq.create(undefined);
  }

  @Query(() => Boolean)
  findOneContact() {
    return this.rmq.findOne(undefined);
  }

  @Query(() => Boolean)
  findAllContacts() {
    return this.rmq.findAll(undefined);
  }

  @Mutation(() => Boolean)
  updateContact() {
    return this.rmq.update(undefined);
  }

  @Mutation(() => Boolean)
  removeContact() {
    return this.rmq.remove(undefined);
  }
}
