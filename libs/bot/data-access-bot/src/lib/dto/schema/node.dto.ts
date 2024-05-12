import { IsEnum, IsString } from 'class-validator';

export enum NodeType {
  Start = 'Start',
  SendMessage = 'SendMessage',
  CollectInput = 'CollectInput',
  Buttons = 'Buttons',
  Branches = 'Branches',
  Fetch = 'Fetch',
  Enqueue = 'Enqueue',
  Close = 'Close',
  AssignTags = 'AssignTags',
}

export class NodeDto<T extends NodeType> {
  @IsString()
  id: string;

  @IsEnum(NodeType)
  type: T;
}
