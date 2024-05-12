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
import { NodeDto, NodeType } from './node.dto';
import {
  AssignTagsDto,
  BranchesDto,
  ButtonsDto,
  CollectInputDto,
  EnqueueDto,
  FetchDto,
  SendMessageDto,
  StartDto,
} from './schema.dto';
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

class FlowNode<T extends NodeType> extends NodeDto<T> {
  @Type(() => Position)
  @ValidateNested()
  position: Position;
}

class Data {
  @IsString()
  name: string;
}

class StartData extends IntersectionType(Data, StartDto) {}
class Start extends FlowNode<NodeType.Start> {
  @Type(() => StartData)
  @ValidateNested()
  data: StartData;
}

class SendMessageData extends IntersectionType(Data, SendMessageDto) {}
class SendMessage extends FlowNode<NodeType.SendMessage> {
  @Type(() => SendMessageData)
  @ValidateNested()
  data: SendMessageData;
}

class CollectInputData extends IntersectionType(Data, CollectInputDto) {}
class CollectInput extends FlowNode<NodeType.CollectInput> {
  @Type(() => CollectInputData)
  @ValidateNested()
  data: CollectInputData;
}

class ButtonsData extends IntersectionType(Data, ButtonsDto) {}
class Buttons extends FlowNode<NodeType.Buttons> {
  @Type(() => ButtonsData)
  @ValidateNested()
  data: ButtonsData;
}

class BranchesData extends IntersectionType(Data, BranchesDto) {}
class Branches extends FlowNode<NodeType.Branches> {
  @Type(() => BranchesData)
  @ValidateNested()
  data: BranchesData;
}

class FetchData extends IntersectionType(Data, FetchDto) {}
class Fetch extends FlowNode<NodeType.Fetch> {
  @Type(() => FetchData)
  @ValidateNested()
  data: FetchData;
}

class EnqueueData extends IntersectionType(Data, EnqueueDto) {}
class Enqueue extends FlowNode<NodeType.Enqueue> {
  @Type(() => EnqueueData)
  @ValidateNested()
  data: EnqueueData;
}

class Close extends FlowNode<NodeType.Close> {
  @Type(() => Data)
  @ValidateNested()
  data: Data;
}

class AssignTagsData extends IntersectionType(Data, AssignTagsDto) {}
class AssignTags extends FlowNode<NodeType.AssignTags> {
  @Type(() => AssignTagsData)
  @ValidateNested()
  data: AssignTagsData;
}

type Nodes =
  | Start
  | SendMessage
  | CollectInput
  | Buttons
  | Branches
  | Fetch
  | Enqueue
  | Close
  | AssignTags;

export class FlowDto {
  @Type(() => Edge)
  @IsArray()
  @ValidateNested({ each: true })
  edges: Edge[];

  @Type(() => FlowNode, {
    discriminator: {
      property: 'type',
      subTypes: [
        { name: NodeType.Start, value: Start },
        { name: NodeType.SendMessage, value: SendMessage },
        { name: NodeType.CollectInput, value: CollectInput },
        { name: NodeType.Buttons, value: Buttons },
        { name: NodeType.Branches, value: Branches },
        { name: NodeType.Fetch, value: Fetch },
        { name: NodeType.Enqueue, value: Enqueue },
        { name: NodeType.Close, value: Close },
        { name: NodeType.AssignTags, value: AssignTags },
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
