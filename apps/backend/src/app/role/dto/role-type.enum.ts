import { registerEnumType } from '@nestjs/graphql';

export enum RoleType {
  Platform = 'Platform',
}

registerEnumType(RoleType, {
  name: 'RoleType',
});
