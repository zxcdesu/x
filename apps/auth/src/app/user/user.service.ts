import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  async create(payload: CreateUserDto) {
    throw new NotImplementedException();
  }

  async findOne() {
    throw new NotImplementedException();
  }

  async findAll() {
    throw new NotImplementedException();
  }

  async update(payload: UpdateUserDto) {
    throw new NotImplementedException();
  }

  async remove() {
    throw new NotImplementedException();
  }
}
