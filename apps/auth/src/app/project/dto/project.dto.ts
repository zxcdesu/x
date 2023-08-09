import { Project } from '../../prisma.service';

export class ProjectDto implements Project {
  id: number;

  name: string;

  description: string;

  imageUrl: string;

  createdAt: Date;

  updatedAt: Date;
}
