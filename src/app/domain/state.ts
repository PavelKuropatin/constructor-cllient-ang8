import {Variable} from './variable';
import {Source} from './source';
import {Target} from './target';

export class State {
  uuid: string;
  name: string;
  template: string;
  color: string;
  inputContainer: Variable[];
  outputContainer: Variable[];
  sources: Source[];
  targets: Target[];
  x: number;
  y: number;
}
