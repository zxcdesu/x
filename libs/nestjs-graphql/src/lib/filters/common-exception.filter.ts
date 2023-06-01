import { ArgumentsHost, Catch } from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Catch()
export class CommonExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    switch (host.getType<GqlContextType | 'rmq'>()) {
      case 'graphql':
        throw new ApolloError(exception?.message, exception?.status, exception);
    }
  }
}
