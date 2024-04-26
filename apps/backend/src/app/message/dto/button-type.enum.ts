import { registerEnumType } from '@nestjs/graphql';
import { ButtonType } from '@zxcdesu/data-access-message';

registerEnumType(ButtonType, {
  name: 'ButtonType',
});

export { ButtonType };
