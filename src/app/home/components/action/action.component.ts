import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {State} from '../../../domain/state';
import {ObjectService} from '../../services/object.service';
import {JsPlumbStyleService} from '../../services/js-plumb-style.service';
import CONSTANTS from '../../../config/business-constants';
import {jsPlumbInstance} from 'jsplumb';

declare var $: any;

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActionComponent implements OnInit {
  @Input() state: State;
  @Input() states: State[];
  @Output() setActiveStateF: EventEmitter<any> = new EventEmitter();
  @Input() jsPlumbInstance: jsPlumbInstance;
  readonly CONSTANTS = CONSTANTS;
  targetEndpointStyle1: object;
  targetEndpointStyle2: object;
  sourceEndpointStyle1: object;
  sourceEndpointStyle2: object;

  constructor(
    private objectService: ObjectService,
    private jsPlumbStyleService: JsPlumbStyleService
  ) {
  }

  ngOnInit() {
    this.targetEndpointStyle1 = this.jsPlumbStyleService.getTargetEndpointStyle1();
    this.targetEndpointStyle2 = this.jsPlumbStyleService.getTargetEndpointStyle2();
    this.sourceEndpointStyle1 = this.jsPlumbStyleService.getSourceEndpointStyle1();
    this.sourceEndpointStyle2 = this.jsPlumbStyleService.getSourceEndpointStyle2();
  }

  setActiveState(state: State) {
    this.setActiveStateF.emit(state);
  }

  countFunction(states: State[], state: State) {
    this.objectService.countFunction(states, state);
  }
}

// <app-jsplumb-endpoint [anchor]="state.style.sourceAnchor"
//   [ngClass]="state.style.sourceEndpoint"
//   [settings]="(state.style.sourceAnchor === CONSTANTS.ANCHOR.LEFT_MIDDLE || state.style.sourceAnchor === CONSTANTS.ANCHOR.RIGHT_MIDDLE) ? targetEndpointStyle1 : sourceEndpointStyle2"
//   [uuid]="state.source.uuid"
//   [state]="state"
//   [jsPlumbInstance]="jsPlumbInstance"
// id="{{state.source.uuid}}">
//
// </app-jsplumb-endpoint>
// <app-jsplumb-endpoint [anchor]="state.style.targetAnchor"
//   [ngClass]="state.style.targetEndpoint"
//   [settings]="(state.style.targetAnchor === CONSTANTS.ANCHOR.LEFT_MIDDLE || state.style.targetAnchor === CONSTANTS.ANCHOR.RIGHT_MIDDLE) ? targetEndpointStyle1 : targetEndpointStyle2"
//   [jsPlumbInstance]="jsPlumbInstance"
//   [uuid]="state.target.uuid"
//   [state]="state"
// id="{{state.target.uuid}}"></app-jsplumb-endpoint>

