import {ContainerType} from './container-type.enum';

export class Variable {
  label: string;
  value: number;
  type: ContainerType;
  expression: string;


  constructor(label: string, value: number, type?: ContainerType, expression?: string) {
    this.label = label;
    this.value = value;
    this.type = type;
    this.expression = expression;
  }

}
