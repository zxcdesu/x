import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { Prisma } from '../../../../prisma/generated';

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
