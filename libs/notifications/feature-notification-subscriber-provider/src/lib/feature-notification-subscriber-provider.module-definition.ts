import { ConfigurableModuleBuilder } from '@nestjs/common';
import { NotificationSubscriberProviderOptions } from './notification-subscriber-provider-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<NotificationSubscriberProviderOptions>()
    .setClassMethodName('forRoot')
    .build();
