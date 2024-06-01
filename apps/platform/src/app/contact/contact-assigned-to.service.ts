import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactAssignedToService {
  // constructor(private readonly prismaService: PrismaService) {}
  // enqueue(projectId: number, id: number, payload: EnqueueContactDto) {
  //   return this.prismaService.contact.update({
  //     where: {
  //       projectId,
  //       id,
  //     },
  //     data: {
  //       assignedTo: {
  //         create: payload.assignedTo,
  //       },
  //       status: ContactStatus.Queued,
  //     },
  //     include: {
  //       assignedTo: true,
  //       fields: {
  //         include: {
  //           field: true,
  //         },
  //       },
  //       tags: {
  //         include: {
  //           tag: true,
  //         },
  //       },
  //     },
  //   });
  // }
  // close(projectId: number, id: number, payload: CloseContactDto) {
  //   return this.prismaService.contact.update({
  //     where: {
  //       projectId,
  //       id,
  //     },
  //     data: {
  //       status: ContactStatus.Closed,
  //       ...payload,
  //     },
  //     include: {
  //       assignedTo: true,
  //       fields: {
  //         include: {
  //           field: true,
  //         },
  //       },
  //       tags: {
  //         include: {
  //           tag: true,
  //         },
  //       },
  //     },
  //   });
  // }
}
