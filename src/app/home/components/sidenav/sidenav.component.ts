import {Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Diagram} from '../../../domain/diagram';
import {State} from '../../../domain/state';
import {ObjectService} from '../../services/object.service';
import CONSTANTS from '../../../config/business-constants';
import {ContainerType} from '../../../domain/container-type.enum';
import {MatDialog} from '@angular/material/dialog';
import {Variable} from '../../../domain/variable';
import {AddVariableComponent} from '../dialog/add-variable/add-variable.component';
import {DeleteVariableComponent} from '../dialog/delete-variable/delete-variable.component';
import {HomeComponent} from '../../home.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
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

  constructor(@Inject(HomeComponent) private parent: HomeComponent,
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

  setActiveState(state: State) {
    if (this.activeState === state) {
      this.activeState = null;
    } else {
      this.activeState = state;
    }
    // this.countFunction(this.diagram.states, this.activeState);
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
    this.isActiveSetting = !this.isActiveSetting;
    if (this.isActiveSetting) {
      this.objectService.setConfigState(state);
    } else {
      this.objectService.setConfigState(null);
    }
    this.parent.isActiveSetting = this.isActiveSetting;
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
