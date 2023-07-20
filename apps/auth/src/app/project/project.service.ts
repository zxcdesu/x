import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';

@Injectable()
export class ProjectService {
  async create(payload: CreateProjectDto) {
    throw new NotImplementedException();
  }

  async findOne() {
    throw new NotImplementedException();
  }

  async findAll() {
    throw new NotImplementedException();
  }

  async update(payload: UpdateProjectDto) {
    throw new NotImplementedException();
  }

  async remove() {
    throw new NotImplementedException();
  }
}
