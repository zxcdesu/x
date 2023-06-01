import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class UserService {
  async create() {
    throw new NotImplementedException();
  }

  async findOne() {
    throw new NotImplementedException();
  }

  async findAll() {
    throw new NotImplementedException();
  }

  async update() {
    throw new NotImplementedException();
  }

  async remove() {
    throw new NotImplementedException();
  }
}
