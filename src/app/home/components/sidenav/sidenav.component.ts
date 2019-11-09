import {Component, Input, OnInit} from '@angular/core';
import {Diagram} from '../../../domain/diagram';
import {State} from '../../../domain/state';
import {ObjectService} from '../../services/object.service';
import CONSTANTS from '../../../config/business-constants';
import {ContainerType} from '../../../domain/container-type.enum';
import {MatDialog} from '@angular/material/dialog';
import {Variable} from '../../../domain/variable';
import {OpenDiagramComponent} from '../dialog/open-diagram/open-diagram.component';

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
  partials = Object.values(CONSTANTS.PARTIALS);
  colors = Object.values(CONSTANTS.TYPE_ACTION);
  INPUT = ContainerType.INPUT;
  OUTPUT = ContainerType.OUTPUT;

  constructor(private objectService: ObjectService,
              private matDialog: MatDialog) {
  }

  removeIndex(index: number, states: State[]) {
    this.objectService.removeIndex(index, states);
  }

  countFunction(state: State, states: State[]) {
    this.objectService.countFunction(states, state);
  }

  deleteDiagram(diagram) {
    this.objectService.deleteDiagram(diagram);
  }

  createNewState(diagram: Diagram) {
    return this.objectService.createState(diagram);
  }

  deleteState(diagram: Diagram, state: State) {
    this.objectService.deleteState(diagram, state);
  }

  openContainerDiagram(state: State, type: ContainerType) {
    const dialogRef = this.matDialog.open(OpenDiagramComponent);

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
      this.countFunction(this.activeState, this.diagram.states);
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

  editEndpoints(state) {
    // const dialogRef = this.matDialog.open();
    // dialogRef.afterClosed().subscribe(endpointStyle =>
    //   state.endpointStyle = endpointStyle;
    // this.refreshStates();

    // $mdDialog.show({
    //   locals: { endpointStyle: state.endpointStyle },
    //   controller: 'editEndpointsLayoutController as vm',
    //   template: editEndpointsLayoutTemplate,
    //   clickOutsideToClose: true
    // });
  }

  deleteInput(state: State) {
    // const dialogRef = this.matDialog.open();
    // dialogRef.afterClosed().subscribe(param => {
    //   const tmpVar: Variable = {label: param, type: ContainerType.INPUT, value: 0, function: ''};
    //   this.objectService.deleteVariable(state, tmpVar);
    // });
    // $mdDialog.show({
    //   locals: {container: state.inputContainer},
    //   controller: 'delContainerController as vm',
    //   template: delContainerTemplate,
    //   clickOutsideToClose: true
    // });
  }

  deleteOutput(state: State) {
    // const dialogRef = this.matDialog.open();
    // dialogRef.afterClosed().subscribe(param => {
    //   const tmpVar: Variable = {label: param, type: ContainerType.OUTPUT, value: 0, function: ''};
    //   this.objectService.deleteVariable(state, tmpVar);
    // });
    // $mdDialog.show({
    //   locals: {container: state.outputContainer},
    //   controller: 'delContainerController as vm',
    //   template: delContainerTemplate,
    //   clickOutsideToClose: true
    // });
  }

  configState(state) {
    this.isActiveSetting = !this.isActiveSetting;
    this.objectService.setConfigState(state);

  }

  ngOnInit() {
  }

}
