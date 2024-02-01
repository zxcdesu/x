import { ArgsType } from '@nestjs/graphql';
import { CreateSubscriberDto } from './create-subscriber.dto';

@ArgsType()
export class UpdateSubscriberDto extends CreateSubscriberDto {}
