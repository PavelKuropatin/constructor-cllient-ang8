export class ModelingVariable {
  name: string;
  startValue: number;
  stepValue: number;

  constructor(name: string, startValue: number, stepValue: number) {
    this.name = name;
    this.startValue = startValue;
    this.stepValue = stepValue;
  }
}
