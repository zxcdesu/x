import { registerEnumType } from '@nestjs/graphql';

export enum AssigneeType {
  Bot = 'Bot',
  User = 'User',
}

registerEnumType(AssigneeType, {
  name: 'AssigneeType',
});
