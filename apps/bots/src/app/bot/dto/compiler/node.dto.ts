import { IntersectionType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { AssignedTo } from './assigned-to.dto';
import { Attachment } from './attachment.dto';
import { Branch } from './branch.dto';
import { Button } from './button.dto';
import { Header } from './header.dto';
import { TriggerType } from './trigger-type.enum';
import { ValidationType } from './validation-type.enum';

export enum NodeType {
  Start = 'Start',
  SendMessage = 'SendMessage',
  CollectInput = 'CollectInput',
  Buttons = 'Buttons',
  Branches = 'Branches',
  Fetch = 'Fetch',
  Assign = 'Assign',
  AssignTag = 'AssignTag',
  Close = 'Close',
}

export class Node<T extends NodeType> {
  @IsString()
  id: string;

  @IsEnum(NodeType)
  type: T;
}

export class StartData {
  @IsEnum(TriggerType)
  trigger: TriggerType;
}

export class Start extends IntersectionType(Node<NodeType.Start>, StartData) {
  @IsOptional()
  @IsString()
  next?: string;
}

export class SendMessageData {
  @IsString()
  text: string;

  @Type(() => Attachment)
  @ValidateNested({ each: true })
  attachments: Attachment[];
}

export class SendMessage extends IntersectionType(
  Node<NodeType.SendMessage>,
  SendMessageData,
) {
  @IsOptional()
  @IsString()
  next?: string;
}

export class CollectInputData extends SendMessageData {
  @IsString()
  variable: string;

  @IsEnum(ValidationType)
  validation: ValidationType;

  @ValidateIf(
    ({ validation }: CollectInputData) => validation === ValidationType.RegExp,
  )
  @IsString()
  regexp?: string;
}

export class CollectInput extends IntersectionType(
  Node<NodeType.CollectInput>,
  CollectInputData,
) {
  @IsOptional()
  @IsString()
  next?: string;
}

export class ButtonsData {
  @IsString()
  text: string;

  @Type(() => Button)
  @ValidateNested({ each: true })
  buttons: Button[];
}

export class Buttons extends IntersectionType(
  Node<NodeType.Buttons>,
  ButtonsData,
) {}

export class BranchesData {
  @Type(() => Branch)
  @ValidateNested({ each: true })
  branches: Branch[];

  @IsOptional()
  @IsString()
  default?: string;
}

export class Branches extends IntersectionType(
  Node<NodeType.Branches>,
  BranchesData,
) {}

export class FetchData {
  @IsOptional()
  @IsString()
  method?: string;

  @IsUrl()
  url: string;

  @Type(() => Header)
  @ValidateNested({ each: true })
  headers: Header[];

  @IsOptional()
  @IsString()
  data?: string;

  @IsOptional()
  @IsString()
  variable?: string;
}

export class FetchCall extends IntersectionType(
  Node<NodeType.Fetch>,
  FetchData,
) {
  @IsOptional()
  @IsString()
  next?: string;

  @IsOptional()
  @IsString()
  error?: string;
}

export class AssignData {
  @Type(() => AssignedTo)
  @ValidateNested()
  assignedTo?: AssignedTo;
}

export class Assign extends IntersectionType(
  Node<NodeType.Assign>,
  AssignData,
) {
  @IsOptional()
  @IsString()
  next?: string;
}

export class AssignTagData {
  @IsInt()
  tagId: number;
}

export class AssignTag extends IntersectionType(
  Node<NodeType.AssignTag>,
  AssignTagData,
) {
  @IsOptional()
  @IsString()
  next?: string;
}

export class Close extends Node<NodeType.Close> {
  @IsOptional()
  @IsString()
  next?: string;
}

export type Nodes =
  | Start
  | SendMessage
  | CollectInput
  | Buttons
  | Branches
  | FetchCall
  | Assign
  | AssignTag
  | Close;
