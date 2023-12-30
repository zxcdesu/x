import { registerEnumType } from '@nestjs/graphql';

export enum Category {
  Other = 'Other',
}

registerEnumType(Category, {
  name: 'Category',
});
