import { ConfigurableModuleBuilder } from '@nestjs/common';
import { DataAccessPaymentModuleOptions } from './data-access-payment-module-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<DataAccessPaymentModuleOptions>()
    .setClassMethodName('forRoot')
    .build();
