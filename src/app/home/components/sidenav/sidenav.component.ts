import {Component, Input, OnInit} from '@angular/core';
import {Diagram} from '../../../domain/diagram';
import {State} from '../../../domain/state';
import {ObjectService} from '../../services/object.service';
import CONSTANTS from '../../../config/business-constants';
import {ContainerType} from '../../../domain/container-type.enum';
import {MatDialog} from '@angular/material/dialog';
import {Variable} from '../../../domain/variable';
import {AddVariableComponent} from '../dialog/add-variable/add-variable.component';
import {DeleteVariableComponent} from '../dialog/delete-variable/delete-variable.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Input() diagram: Diagram;
  @Input() activeState: State;
  @Input() isActiveSetting: boolean;
  @Input() isActiveModel: object;
  partials: string[];
  colors: object;
  INPUT: ContainerType;
  OUTPUT: ContainerType;

  constructor(private objectService: ObjectService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.partials = Object.values(CONSTANTS.PARTIALS);
    this.colors = Object.values(CONSTANTS.TYPE_ACTION);
    this.INPUT = ContainerType.INPUT;
    this.OUTPUT = ContainerType.OUTPUT;
  }

  addVariable(state: State, type: ContainerType) {
    const dialogRef = this.matDialog.open(AddVariableComponent);

    dialogRef.afterClosed().subscribe((variable: Variable) => {
      variable.type = type;
      this.objectService.addVariable(state, variable);
    });
  }

  setActiveState(state: State) {
    if (this.activeState === state) {
      this.activeState = null;
    } else {
      this.activeState = state;
      this.countFunction(this.diagram.states, this.activeState);
    }
  }

  isActionState(state: State) {
    return state.template === CONSTANTS.PARTIALS.ACTION;
  }

  refreshStates() {
    const bufferedStates = this.diagram.states.splice(0);
    this.diagram.states = [];
    setTimeout(() => this.diagram.states = bufferedStates);
  }

  deleteVariable(state: State, type: ContainerType) {
    const dialogRef = this.matDialog.open(DeleteVariableComponent, {
      data: type === ContainerType.INPUT ? state.inputContainer : state.outputContainer
    });
    dialogRef.afterClosed().subscribe((variable: Variable) => {
      this.objectService.deleteVariable(state, variable);
    });
  }

  configState(state) {
    this.isActiveSetting = !this.isActiveSetting;
    this.objectService.setConfigState(state);

  }


  removeIndex(index: number, objects: object[]) {
    this.objectService.removeIndex(index, objects);
  }

  countFunction(states: State[], state: State) {
    this.objectService.countFunction(states, state);
  }

  createNewState(diagram: Diagram) {
    return this.objectService.createState(diagram);
  }

  deleteState(diagram: Diagram, state: State) {
    this.objectService.deleteState(diagram, state);
  }

}
