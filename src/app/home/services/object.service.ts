import {Injectable} from '@angular/core';
import {ObjectHttpService} from './object-http.service';
import {Diagram} from '../../domain/diagram';
import {State} from '../../domain/state';
import {Variable} from '../../domain/variable';
import {Target} from '../../domain/target';

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

  updateContainer(states: State[], sourceUuid: string, targetUuid: string) {
    const inputContainer = this.findStateByTarget(states, targetUuid).inputContainer;
    this.findStateBySource(states, sourceUuid).outputContainer
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
    state.outputContainer.forEach(container => {
      let bufFunction = container.expression.trim();
      state.inputContainer.forEach(item => {
        bufFunction = bufFunction.replace(new RegExp(item.label, 'g'), item.value.toString());
      });
      try {
        // tslint:disable-next-line:no-eval
        container.value = eval(bufFunction);
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
      return state.source.connections.find(connection => connection.uuid === target);
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
