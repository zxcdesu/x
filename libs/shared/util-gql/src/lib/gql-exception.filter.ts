import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { ErrorWithProps } from 'mercurius';

@Catch()
export class GqlExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(exception: any, host: ArgumentsHost) {
    switch (host.getType<GqlContextType>()) {
      case 'graphql':
        throw new ErrorWithProps(
          exception?.message,
          exception,
          exception?.statusCode,
        );

      default:
        throw exception;
    }
  }
}
