import { Injectable } from '@nestjs/common';
import { BlockList } from 'net';

@Injectable()
export class YookassaSafetyService {
  private readonly blockList = new BlockList();

  constructor() {
    this.blockList.addSubnet('185.71.76.0', 27);
    this.blockList.addSubnet('185.71.77.0', 27);
    this.blockList.addSubnet('77.75.153.0', 25);
    this.blockList.addAddress('77.75.156.11');
    this.blockList.addAddress('77.75.156.35');
    this.blockList.addSubnet('77.75.154.128', 25);
    this.blockList.addSubnet('2a02:5180::', 32, 'ipv6');
  }

  check = this.blockList.check.bind(this);
}
