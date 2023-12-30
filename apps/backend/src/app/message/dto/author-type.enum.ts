import { registerEnumType } from '@nestjs/graphql';

export enum AuthorType {
  Bot = 'Bot',
  Contact = 'Contact',
  User = 'User',
}

registerEnumType(AuthorType, {
  name: 'AuthorType',
});
