import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
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
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {

  @Input() diagram: Diagram;
  @Output() showStateSettingsF: EventEmitter<any> = new EventEmitter<any>();

  fullState: State;
  settingsState: State;
  partials: string[];
  colors: object;
  INPUT: ContainerType;
  OUTPUT: ContainerType;

  constructor(
    private objectService: ObjectService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.partials = Object.values(CONSTANTS.PARTIALS);
    this.colors = Object.values(CONSTANTS.TYPE_ACTION);
    this.INPUT = ContainerType.INPUT;
    this.OUTPUT = ContainerType.OUTPUT;
  }

  addVariable(state: State, type: ContainerType) {
    const dialogRef = this.dialog.open(AddVariableComponent, {
      panelClass: 'no-dialog-padding'
    });

    dialogRef.afterClosed().subscribe((variable: Variable) => {
      variable.type = ContainerType[type];
      this.objectService.addVariable(state, variable);
    });
  }

  showFullState(state: State) {
    if (this.fullState === state) {
      this.fullState = null;
    } else {
      this.fullState = state;
      this.countFunction(this.diagram.states, this.fullState);
    }
  }

  isFullState(state: State) {
    return state === this.fullState;
  }

  deleteVariable(state: State, type: ContainerType) {
    const dialogRef = this.dialog.open(DeleteVariableComponent, {
      panelClass: 'no-dialog-padding',
      data: type === ContainerType.INPUT ? state.inputContainer : state.outputContainer
    });
    dialogRef.afterClosed().subscribe((variable: Variable) => {
      variable.type = ContainerType[type];
      this.objectService.deleteVariable(state, variable);
    });
  }

  showStateSettings(state) {
    if (this.settingsState === state) {
      this.settingsState = null;
    } else {
      this.settingsState = state;
      this.countFunction(this.diagram.states, this.settingsState);
    }
    this.showStateSettingsF.emit(this.settingsState);
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
