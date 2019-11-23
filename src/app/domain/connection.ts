import {Target} from './target';

export class Connection {

  isVisible: boolean;
  uuid: Target;
  condition: string;

  constructor(uuid: Target, isVisible: boolean, condition?: string) {
    this.isVisible = isVisible;
    this.uuid = uuid;
    this.condition = condition;
  }
}
