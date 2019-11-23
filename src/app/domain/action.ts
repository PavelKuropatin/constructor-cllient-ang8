export class Action {
  uuid: string;
  number: number;
  condition: string;
  type: string;
  value: string;


  constructor(condition: string, type: string) {
    this.condition = condition;
    this.type = type;
  }
}
