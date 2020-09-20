import {Output} from './output';

export class Connection {

  isVisible: boolean;
  target: Output;
  condition: string;

  constructor(uuid: Output, isVisible: boolean, condition?: string) {
    this.isVisible = isVisible;
    this.target = uuid;
    this.condition = condition;
  }
}
