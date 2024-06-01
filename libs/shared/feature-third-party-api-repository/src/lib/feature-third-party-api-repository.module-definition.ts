import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ThirdPartyApiRepositoryOptions } from './third-party-api-repository-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ThirdPartyApiRepositoryOptions>()
    .setClassMethodName('forRoot')
    .build();
