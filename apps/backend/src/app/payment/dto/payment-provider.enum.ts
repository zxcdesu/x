import { registerEnumType } from '@nestjs/graphql';
import { PaymentProvider } from '@zxcdesu/prisma-billing';

registerEnumType(PaymentProvider, {
  name: 'PaymentProvider',
});

export { PaymentProvider };
