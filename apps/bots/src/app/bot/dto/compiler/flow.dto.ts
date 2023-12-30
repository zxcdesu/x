import { IntersectionType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import * as node from './node.dto';
import { Variable } from './variable.dto';

class MarkerEnd {
  @IsString()
  type: string;
}

class Edge {
  @IsString()
  id: string;

  @IsString()
  type: string;

  @IsString()
  source: string;

  @IsOptional()
  @IsString()
  sourceHandle?: string;

  @IsString()
  target: string;

  @IsOptional()
  @IsString()
  targetHandle?: string;

  @Type(() => MarkerEnd)
  @ValidateNested()
  markerEnd: MarkerEnd;
}

class Position {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;
}

class Node<T extends node.NodeType> extends node.Node<T> {
  @Type(() => Position)
  @ValidateNested()
  position: Position;
}

class Data {
  @IsString()
  name: string;
}

class StartData extends IntersectionType(node.StartData, Data) {}
class Start extends Node<node.NodeType.Start> {
  @Type(() => StartData)
  @ValidateNested()
  data: StartData;
}

class SendMessageData extends IntersectionType(node.SendMessageData, Data) {}
class SendMessage extends Node<node.NodeType.SendMessage> {
  @Type(() => SendMessageData)
  @ValidateNested()
  data: SendMessageData;
}

class CollectInputData extends IntersectionType(node.CollectInputData, Data) {}
class CollectInput extends Node<node.NodeType.CollectInput> {
  @Type(() => CollectInputData)
  @ValidateNested()
  data: CollectInputData;
}

class ButtonsData extends IntersectionType(node.ButtonsData, Data) {}
class Buttons extends Node<node.NodeType.Buttons> {
  @Type(() => ButtonsData)
  @ValidateNested()
  data: ButtonsData;
}

class BranchesData extends IntersectionType(node.BranchesData, Data) {}
class Branches extends Node<node.NodeType.Branches> {
  @Type(() => BranchesData)
  @ValidateNested()
  data: BranchesData;
}

class FetchData extends IntersectionType(node.FetchData, Data) {}
class Fetch extends Node<node.NodeType.Fetch> {
  @Type(() => FetchData)
  @ValidateNested()
  data: FetchData;
}

class AssignData extends IntersectionType(node.AssignData, Data) {}
class Assign extends Node<node.NodeType.Assign> {
  @Type(() => AssignData)
  @ValidateNested()
  data: AssignData;
}

class AssignTagData extends IntersectionType(node.AssignTagData, Data) {}
class AssignTag extends Node<node.NodeType.AssignTag> {
  @Type(() => AssignTagData)
  @ValidateNested()
  data: AssignTagData;
}

class Close extends Node<node.NodeType.Close> {
  @Type(() => Data)
  @ValidateNested()
  data: Data;
}

type Nodes =
  | Start
  | SendMessage
  | CollectInput
  | Buttons
  | Branches
  | Fetch
  | Assign
  | AssignTag
  | Close;

export class Flow {
  @Type(() => Edge)
  @IsArray()
  @ValidateNested({ each: true })
  edges: Edge[];

  @Type(() => Node, {
    discriminator: {
      property: 'type',
      subTypes: [
        { name: node.NodeType.Start, value: Start },
        { name: node.NodeType.SendMessage, value: SendMessage },
        { name: node.NodeType.CollectInput, value: CollectInput },
        { name: node.NodeType.Buttons, value: Buttons },
        { name: node.NodeType.Branches, value: Branches },
        { name: node.NodeType.Fetch, value: Fetch },
        { name: node.NodeType.Assign, value: Assign },
        { name: node.NodeType.AssignTag, value: AssignTag },
        { name: node.NodeType.Close, value: Close },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  nodes: Nodes[];

  @Type(() => Variable)
  @IsArray()
  @ValidateNested({ each: true })
  variables: Variable[];
}
