import { IntersectionType } from '@nestjs/mapped-types';
import { AssignedToDto } from '@zxcdesu/data-access-contact';
import {
  AttachmentDto,
  CreateAttachmentDto,
  CreateButtonDto,
} from '@zxcdesu/data-access-message';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Branch } from './branch.dto';
import { NodeDto, NodeType } from './node.dto';
import { Variable } from './variable.dto';

enum TriggerType {
  NewChat = 'NewChat',
  Webhook = 'Webhook',
}

export class StartDto {
  @IsEnum(TriggerType)
  trigger: TriggerType;
}

class Start extends IntersectionType(NodeDto<NodeType.Start>, StartDto) {
  @IsOptional()
  @IsString()
  next?: string;
}

export class SendMessageDto {
  @IsString()
  text: string;

  @Type(() => AttachmentDto)
  @ValidateNested({ each: true })
  attachments: CreateAttachmentDto[];
}

class SendMessage extends IntersectionType(
  NodeDto<NodeType.SendMessage>,
  SendMessageDto,
) {
  @IsOptional()
  @IsString()
  next?: string;
}

enum ValidationType {
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
  Email = 'Email',
  Phone = 'Phone',
  RegExp = 'RegExp',
}

export class CollectInputDto extends SendMessageDto {
  @IsString()
  variable: string;

  @IsEnum(ValidationType)
  validation: ValidationType;

  @ValidateIf(
    ({ validation }: CollectInputDto) => validation === ValidationType.RegExp,
  )
  @IsString()
  regexp?: string;
}

class CollectInput extends IntersectionType(
  NodeDto<NodeType.CollectInput>,
  CollectInputDto,
) {
  @IsOptional()
  @IsString()
  next?: string;
}

class ButtonDto extends CreateButtonDto {
  @IsString()
  next?: string;
}

export class ButtonsDto extends SendMessageDto {
  @Type(() => ButtonDto)
  @ValidateNested({ each: true })
  buttons: ButtonDto[];
}

class Buttons extends IntersectionType(NodeDto<NodeType.Buttons>, ButtonsDto) {}

export class BranchesDto {
  @Type(() => Branch)
  @ValidateNested({ each: true })
  branches: Branch[];

  @IsOptional()
  @IsString()
  defaultBranch?: string;
}

class Branches extends IntersectionType(
  NodeDto<NodeType.Branches>,
  BranchesDto,
) {}

class Header {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

export class FetchDto {
  @IsOptional()
  @IsString()
  method?: string;

  @IsUrl()
  url: string;

  @Type(() => Header)
  @ValidateNested({ each: true })
  headers: Header[];

  @IsOptional()
  @IsDefined()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;

  @IsOptional()
  @IsString()
  variable?: string;
}

class Fetch extends IntersectionType(NodeDto<NodeType.Fetch>, FetchDto) {
  @IsOptional()
  @IsString()
  next?: string;

  @IsOptional()
  @IsString()
  error?: string;
}

export class EnqueueDto {
  @Type(() => AssignedToDto)
  @ValidateNested()
  assignedTo?: AssignedToDto;
}

class Enqueue extends IntersectionType(NodeDto<NodeType.Enqueue>, EnqueueDto) {
  @IsOptional()
  @IsString()
  next?: string;
}

class Close extends NodeDto<NodeType.Close> {
  @IsOptional()
  @IsString()
  next?: string;
}

export class AssignTagsDto {
  @IsInt()
  tagIds: number;
}

class AssignTags extends IntersectionType(
  NodeDto<NodeType.AssignTags>,
  AssignTagsDto,
) {
  @IsOptional()
  @IsString()
  next?: string;
}

type Nodes =
  | Start
  | SendMessage
  | CollectInput
  | Buttons
  | Branches
  | Fetch
  | Enqueue
  | AssignTags
  | Close;

export class SchemaDto {
  @Type(() => NodeDto, {
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
  @ValidateNested({ each: true })
  nodes: Nodes[];

  @Type(() => Variable)
  @ValidateNested({ each: true })
  variables: Variable[];
}
