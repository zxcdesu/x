import { Exclude } from 'class-transformer';
import { User } from '../../prisma.service';

export class UserDto implements User {
  id: number;

  name: string;

  imageUrl: string;

  email: string;

  emailConfirmed: boolean;

  phone: string;

  phoneConfirmed: boolean;

  @Exclude()
  password: string;

  createdAt: Date;

  updatedAt: Date;
}
