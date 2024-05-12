import { IsDefined, IsEnum, IsString } from 'class-validator';

enum VariableType {
  Number = 'Number',
  String = 'String',
}

export class Variable {
  @IsString()
  name: string;

  @IsEnum(VariableType)
  type: VariableType;

  @IsDefined()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}
