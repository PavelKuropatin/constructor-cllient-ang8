import {Variable} from './variable';
import {Input} from './input';
import {Output} from './output';
import {Style} from './style';
import {Settings} from './settings';

export class Block {
  uuid: string;
  name: string;
  template: string;
  color: string;
  inputContainer: Variable[];
  outputContainer: Variable[];
  style: Style;
  source: Input;
  target: Output;
  settings: Settings;
  x: number;
  y: number;
}
