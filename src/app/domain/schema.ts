import {Block} from './block';

export class Schema {
  uuid: string;
  name: string;
  description: string;
  states: Block[];

  constructor(states: Block[]) {
    this.states = states;
  }
}
