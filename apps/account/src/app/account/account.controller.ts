import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseUUIDPipe, SerializeOptions } from '@nestjs/common';
import {
  AccountDto,
  AccountRmq,
  AccountService,
  CreateAccountDto,
  UpdateAccountDto,
} from '@zxcdesu/data-access-account';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @AccountRmq.create()
  @SerializeOptions({
    type: AccountDto,
  })
  create(@RabbitPayload() payload: CreateAccountDto): Promise<AccountDto> {
    return this.accountService.create(payload);
  }

  @AccountRmq.findOne()
  @SerializeOptions({
    type: AccountDto,
  })
  findOne(@RabbitPayload('id', ParseUUIDPipe) id: string): Promise<AccountDto> {
    return this.accountService.findOne(id);
  }

  @AccountRmq.findAll()
  @SerializeOptions({
    type: AccountDto,
  })
  findAll(): Promise<AccountDto[]> {
    return this.accountService.findAll();
  }

  @AccountRmq.update()
  @SerializeOptions({
    type: AccountDto,
  })
  update(
    @RabbitPayload('id', ParseUUIDPipe) id: string,
    @RabbitPayload() payload: UpdateAccountDto,
  ): Promise<AccountDto> {
    return this.accountService.update(id, payload);
  }

  @AccountRmq.remove()
  @SerializeOptions({
    type: AccountDto,
  })
  remove(@RabbitPayload('id', ParseUUIDPipe) id: string): Promise<AccountDto> {
    return this.accountService.remove(id);
  }
}
