import {Component, Input, OnInit} from '@angular/core';
import {Diagram} from '../../../domain/diagram';
import {State} from '../../../domain/state';
import {ObjectService} from '../../../home/services/object.service';
import CONSTANTS from '../../../config/business-constants';
import {ContainerType} from '../../../domain/container-type.enum';
import {MatDialog} from '@angular/material/dialog';
import {Connection} from '../../../domain/connection';


@Component({
  selector: 'app-modeling-sidenav',
  templateUrl: './modeling-sidenav.component.html',
  styleUrls: ['./modeling-sidenav.component.scss']
})
export class ModelingSidenavComponent implements OnInit {

  @Input() diagram: Diagram;
  @Input() activeState: State;
  @Input() isActiveSettings: boolean;
  @Input() editable: boolean;
  @Input() isActiveModel: object;
  @Input() isActiveState: (state: State) => any;
  @Input() setActiveState: (state: State) => any;

  partials = Object.values(CONSTANTS.PARTIALS);
  colors = Object.values(CONSTANTS.TYPE_ACTION);
  INPUT = ContainerType.INPUT;
  OUTPUT = ContainerType.OUTPUT;
  sortableOptions: object;

  constructor(private objectService: ObjectService,
              private matDialog: MatDialog) {

  }

  changeVisibility(connection: Connection) {
    connection.isVisible = !connection.isVisible;
  }

  refreshStates() {
    const bufferedStates = this.diagram.states.slice();
    this.diagram.states = [];
    setTimeout(() => this.diagram.states = bufferedStates);
  }

  showStateSettings(state: State) {
    this.isActiveSettings = !this.isActiveSettings;
    this.objectService.setConfigState(state);
  }

  configState(state: State) {
    this.isActiveSettings = !this.isActiveSettings;
    this.objectService.setConfigState(state);
  }

  ngOnInit(): void {
    this.sortableOptions = {
      connectWith: '.connectedItems'
    };
  }


}
