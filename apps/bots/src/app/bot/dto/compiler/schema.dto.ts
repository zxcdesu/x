import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import {
  Assign,
  Branches,
  Buttons,
  Close,
  CollectInput,
  FetchCall,
  Node,
  NodeType,
  Nodes,
  SendMessage,
  Start,
} from './node.dto';
import { Variable } from './variable.dto';

export class Schema {
  @Type(() => Node, {
    discriminator: {
      property: 'type',
      subTypes: [
        { name: NodeType.Start, value: Start },
        { name: NodeType.SendMessage, value: SendMessage },
        { name: NodeType.CollectInput, value: CollectInput },
        { name: NodeType.Buttons, value: Buttons },
        { name: NodeType.Branches, value: Branches },
        { name: NodeType.Fetch, value: FetchCall },
        { name: NodeType.Assign, value: Assign },
        { name: NodeType.Close, value: Close },
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
