import {ModelingVariable} from './modeling-variable';

export class ModelingSettings {
  type: string;
  interval: number;
  params: object;
  vars: ModelingVariable[];

  constructor(type?: string, interval?: number, params?: object, vars?: ModelingVariable[]) {
    this.type = type;
    this.interval = interval || 0;
    this.params = params || [];
    this.vars = vars || [];
  }
}
