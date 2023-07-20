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
import { Prisma } from '../../../prisma/generated';

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

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsInt()
  id: number;
}
