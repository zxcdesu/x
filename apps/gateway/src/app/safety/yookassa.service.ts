import { Injectable, OnModuleInit } from '@nestjs/common';
import { BlockList } from 'net';

@Injectable()
export class YookassaService extends BlockList implements OnModuleInit {
  onModuleInit() {
    super.addSubnet('185.71.76.0', 27);
    super.addSubnet('185.71.77.0', 27);
    super.addSubnet('77.75.153.0', 25);
    super.addAddress('77.75.156.11');
    super.addAddress('77.75.156.35');
    super.addSubnet('77.75.154.128', 25);
    super.addSubnet('2a02:5180::', 32, 'ipv6');
  }
}
