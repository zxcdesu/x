import { Prisma } from '@zxcdesu/prisma-auth';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateUserDto implements Prisma.UserUncheckedCreateInput {
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  @Length(8, 64)
  password: string;
}
