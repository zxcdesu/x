import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Flow } from './dto/compiler/flow.dto';
import { NodeType } from './dto/compiler/node.dto';
import { Schema } from './dto/compiler/schema.dto';

@Injectable()
export class BotCompiler {
  async compile(flow: Flow): Promise<Schema> {
    const schema: Schema = {
      nodes: [],
      variables: flow.variables,
    };

    for (const { data, id, type } of flow.nodes) {
      const edges = flow.edges.filter(this.equals('source', id));
      switch (type) {
        case NodeType.Start:
        case NodeType.SendMessage:
        case NodeType.CollectInput:
        case NodeType.Assign:
        case NodeType.AssignTag:
        case NodeType.Close:
          schema.nodes.push(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Object.assign<typeof data, any>(data, {
              id,
              type,
              next: edges.find(this.equals('sourceHandle', 'next'))?.target,
            }),
          );
          break;

        case NodeType.Buttons:
          schema.nodes.push({
            ...data,
            id,
            type,
            buttons: data.buttons.map((button) => ({
              ...button,
              next: edges.find(this.equals('sourceHandle', button.next))
                ?.target,
            })),
          });
          break;

        case NodeType.Branches:
          schema.nodes.push({
            ...data,
            id,
            type,
            branches: data.branches.map((branch) => ({
              ...branch,
              next: edges.find(this.equals('sourceHandle', branch.next))
                ?.target,
            })),
            default: edges.find(this.equals('sourceHandle', 'default'))?.target,
          });
          break;

        case NodeType.Fetch:
          schema.nodes.push({
            ...data,
            id,
            type,
            next: edges.find(this.equals('sourceHandle', id))?.target,
            error: edges.find(this.equals('sourceHandle', 'error'))?.target,
          });
          break;
      }
    }

    const errors = await validate(plainToInstance(Schema, schema));
    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return schema;
  }

  private equals<T extends object>(
    key: keyof T,
    value: T[typeof key],
  ): (obj: T) => boolean {
    return (obj: T) => obj[key] === value;
  }
}
