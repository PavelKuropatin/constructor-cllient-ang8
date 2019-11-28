import {Injectable} from '@angular/core';
import {ObjectHttpService} from './object-http.service';
import {Diagram} from '../../domain/diagram';
import {State} from '../../domain/state';
import {Variable} from '../../domain/variable';
import {Target} from '../../domain/target';
import * as math from 'maths.ts';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  private configState: State;

  constructor(private objectHttpService: ObjectHttpService) {
  }

  createState(diagram: Diagram) {
    this.objectHttpService.createState(diagram.uuid)
      .subscribe(state => diagram.states.push(state));
  }

  deleteState(diagram: Diagram, state: State) {
    this.objectHttpService.deleteState(diagram.uuid, state.uuid)
      .subscribe(response => {
        console.log(response);
      });
    const index = diagram.states.indexOf(state);
    if (index !== -1) {
      diagram.states.splice(index, 1);
    }
  }

  deleteDiagram(diagramUuid: string) {
    this.objectHttpService.deleteDiagram(diagramUuid);
  }

  removeIndex(index: number, array: object[]) {
    array.splice(index, 1);
  }

  setConfigState(state: State) {
    this.configState = state;
  }

  getConfigState() {
    return this.configState;
  }

  addVariable(state: State, variable: Variable) {
    this.objectHttpService.createVariable(state.uuid, variable)
      .subscribe(outState => {
        state.inputContainer = outState.inputContainer;
        state.outputContainer = outState.outputContainer;
      });
  }

  deleteVariable(state: State, variable: Variable) {
    this.objectHttpService.deleteVariable(state.uuid, variable)
      .subscribe(outState => {
        state.inputContainer = outState.inputContainer;
        state.outputContainer = outState.outputContainer;
      });
  }

  updateContainer(states: State[], sourceState: State, targetState: State) {
    const inputContainer = targetState.inputContainer;

    sourceState.outputContainer
      .forEach(oVar => {
        const tmpVar = inputContainer.find(iVar => iVar.label === oVar.label);
        if (tmpVar) {
          tmpVar.value = oVar.value;
        } else {
          inputContainer.push(oVar);
        }
      });
  }

  countFunction(states: State[], state: State) {
    const parentStates = this.getParentStates(states, state.target);
    parentStates.forEach(parentState => {
      this.applyParentContainer(parentState.outputContainer, state.inputContainer);
    });
    state.outputContainer.forEach(variable => {
      let expression = variable.expression.trim();
      state.inputContainer.forEach(item => {
        expression = expression.replace(new RegExp(item.label, 'g'), `${item.value}`);
      });
      try {
        const testVal = math.evaluate(expression).numberValue;
        if (!isNaN(testVal)) {
          variable.value = testVal;
        }
      } catch (err) {
      }
    });
  }

  private findStateBySource(states: State[], sourceUuid: string): State {
    return states.find(state => state.source.uuid === sourceUuid);
  }

  private findStateByTarget(states: State[], targetUuid: string): State {
    return states.find(state => state.target.uuid === targetUuid);
  }

  private getParentStates(states: State[], target: Target) {
    return states.filter(state => {
      return state.source.connections.find(connection => connection.target === target);
    });
  }

  private applyParentContainer(parentContainer: Variable[], childContainer: Variable[]) {
    childContainer.forEach(childVar => {
      const tmpVar = parentContainer.find(parentVar => parentVar.label === childVar.label);
      if (tmpVar) {
        childVar.value = tmpVar.value;
      }
    });
  }

}
