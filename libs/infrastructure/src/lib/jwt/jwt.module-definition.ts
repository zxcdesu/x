import { ConfigurableModuleBuilder } from '@nestjs/common';
import { JwtModuleOptions } from './jwt-module-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<JwtModuleOptions>().build();
