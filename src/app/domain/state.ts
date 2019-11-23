import {Variable} from './variable';
import {Source} from './source';
import {Target} from './target';
import {Style} from './style';
import {Settings} from './settings';

export class State {
  uuid: string;
  name: string;
  template: string;
  color: string;
  inputContainer: Variable[];
  outputContainer: Variable[];
  style: Style;
  source: Source;
  target: Target;
  settings: Settings;
  x: number;
  y: number;
}
