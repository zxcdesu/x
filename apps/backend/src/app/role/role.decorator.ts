import { Reflector } from '@nestjs/core';
import { RoleType } from './dto/role-type.enum';

export const RoleDecorator = Reflector.createDecorator<RoleType[]>();
