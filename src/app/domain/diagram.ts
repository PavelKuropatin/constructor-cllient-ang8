import {State} from './state';

export class Diagram {
  uuid: string;
  name: string;
  description: string;
  states: State[];

  constructor(states: State[]) {
    this.states = states;
  }
}
