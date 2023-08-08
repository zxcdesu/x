import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { Prisma, User } from '../../../prisma/generated';

export class CreateUserDto implements Prisma.UserUncheckedCreateInput {
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone?: string;

  @IsString()
  @Length(8, 64)
  password: string;
}

export class FindOneUserDto {
  @IsInt()
  id: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsInt()
  id: number;
}

export class RemoveUserDto extends FindOneUserDto {}

export class UserDto implements User {
  id: number;

  name: string;

  imageUrl: string;

  email: string;

  emailConfirmed: boolean;

  phone: string;

  phoneConfirmed: boolean;

  password: string;

  createdAt: Date;

  updatedAt: Date;
}
