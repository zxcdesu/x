import { InternalServerErrorException } from '@nestjs/common';

export class UnknownChannelException extends InternalServerErrorException {}
