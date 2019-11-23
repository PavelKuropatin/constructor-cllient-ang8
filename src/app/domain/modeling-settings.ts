import {ModelingVariable} from './modeling-variable';

export class ModelingSettings {
  type: string;
  interval: number;
  params: object;
  vars: ModelingVariable[];

  constructor(type: string, interval: number, params: object, vars: ModelingVariable[]) {
    this.type = type;
    this.interval = interval;
    this.params = params;
    this.vars = vars;
  }
}
