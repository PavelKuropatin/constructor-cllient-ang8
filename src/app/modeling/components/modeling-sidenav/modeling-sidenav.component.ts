import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Diagram} from '../../../domain/diagram';
import {State} from '../../../domain/state';
import {ObjectService} from '../../../home/services/object.service';
import CONSTANTS from '../../../config/business-constants';
import {ContainerType} from '../../../domain/container-type.enum';
import {Connection} from '../../../domain/connection';
import {ModelingComponent} from '../../modeling.component';
import {SortablejsOptions} from 'ngx-sortablejs';


@Component({
  selector: 'app-modeling-sidenav',
  templateUrl: './modeling-sidenav.component.html',
  styleUrls: ['./modeling-sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModelingSidenavComponent implements OnInit {

  @Input() diagram: Diagram;
  @Input() activeState: State;
  @Input() isActiveSetting: boolean;
  @Input() editable: boolean;
  @Input() isActiveModel: object;
  @Output() isActiveState: EventEmitter<any> = new EventEmitter<any>();
  @Output() setActiveState: EventEmitter<any> = new EventEmitter<any>();
  partials = Object.values(CONSTANTS.PARTIALS);
  colors = Object.values(CONSTANTS.TYPE_ACTION);
  INPUT = ContainerType.INPUT;
  OUTPUT = ContainerType.OUTPUT;
  sortableOptions: SortablejsOptions;

  constructor(private objectService: ObjectService,
              @Inject(ModelingComponent) private parent: ModelingComponent) {
  }

  ngOnInit(): void {
    // connectWith: '.connectedItems'
    this.sortableOptions = {
      group: 'states',
      onUpdate: (event: any) => {
        this.refreshStates();
      }
    };
  }

  changeVisibility(connection: Connection) {
    connection.isVisible = !connection.isVisible;
  }

  isActiveStateF(state: State) {
    this.isActiveState.emit(state);
  }

  setActiveStateF(state: State) {
    this.setActiveState.emit(state);
  }

  refreshStates() {
    const bufferedStates = this.diagram.states.slice();
    this.diagram.states = [];
    setTimeout(() => this.diagram.states = bufferedStates);
  }

  showStateSettings(state: State) {
    this.isActiveSetting = !this.isActiveSetting;
    if (this.isActiveSetting) {
      this.objectService.setConfigState(state);
    } else {
      this.objectService.setConfigState(null);
    }
    this.parent.isActiveSetting = this.isActiveSetting;
  }

}
