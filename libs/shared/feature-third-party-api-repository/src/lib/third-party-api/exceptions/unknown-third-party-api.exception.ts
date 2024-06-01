import { InternalServerErrorException } from '@nestjs/common';

export class UnknownThirdPartyApiException extends InternalServerErrorException {}
