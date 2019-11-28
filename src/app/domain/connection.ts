import {Target} from './target';

export class Connection {

  isVisible: boolean;
  target: Target;
  condition: string;

  constructor(uuid: Target, isVisible: boolean, condition?: string) {
    this.isVisible = isVisible;
    this.target = uuid;
    this.condition = condition;
  }
}
