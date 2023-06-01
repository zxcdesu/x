import { Controller } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  create() {
    return this.projectService.create();
  }

  findOne() {
    return this.projectService.findOne();
  }

  findAll() {
    return this.projectService.findAll();
  }

  update() {
    return this.projectService.update();
  }

  remove() {
    return this.projectService.remove();
  }
}
