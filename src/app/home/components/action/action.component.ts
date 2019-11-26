import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {State} from '../../../domain/state';
import {ObjectService} from '../../services/object.service';
import {JsPlumbStyleService} from '../../services/js-plumb-style.service';
import CONSTANTS from '../../../config/business-constants';
import {Endpoint, jsPlumbInstance} from 'jsplumb';
import {Diagram} from '../../../domain/diagram';

declare var $: any;

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() state: State;
  @Input() diagram: Diagram;
  // @Output() setActiveStateF: EventEmitter<any> = new EventEmitter();
  @Input() jsPlumbInstance: jsPlumbInstance;
  readonly CONSTANTS = CONSTANTS;
  targetEndpointStyle1: object;
  targetEndpointStyle2: object;
  sourceEndpointStyle1: object;
  sourceEndpointStyle2: object;
  sp: Endpoint;
  tp: Endpoint;

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

  ngAfterViewInit(): void {
    // console.log(this.jsPlumbInstance);
    // tslint:disable-next-line:max-line-length
    // const tSettings = (this.state.style.targetAnchor === CONSTANTS.ANCHOR.LEFT_MIDDLE || this.state.style.targetAnchor === CONSTANTS.ANCHOR.RIGHT_MIDDLE) ? this.targetEndpointStyle1 : this.targetEndpointStyle2;
    // tslint:disable-next-line:max-line-length
    // const sSettings = (this.state.style.sourceAnchor === CONSTANTS.ANCHOR.LEFT_MIDDLE || this.state.style.sourceAnchor === CONSTANTS.ANCHOR.RIGHT_MIDDLE) ? this.sourceEndpointStyle1 : this.targetEndpointStyle2;

    // @ts-ignore
    // this.sp = this.jsPlumbInstance.addEndpoint(this.state.uuid, {anchor: this.state.style.sourceAnchor, uuid: this.state.source.uuid}, sSettings);
    // @ts-ignore
    // this.tp = this.jsPlumbInstance.addEndpoint(this.state.uuid, {anchor: this.state.style.targetAnchor, uuid: this.state.target.uuid}, tSettings);

    this.jsPlumbInstance.draggable(this.state.uuid, {
      drag: (event) => {
        this.state.x = event.pos[0];
        this.state.y = event.pos[1];
      }
    });
    this.jsPlumbInstance.repaintEverything();
  }

  ngOnDestroy(): void {
    this.jsPlumbInstance.deleteEndpoint(this.sp).deleteEndpoint(this.tp);
  }


  setActiveState(state: State) {
    // this.setActiveStateF.emit(state);
  }

  countFunction(states: State[], state: State) {
    console.log(states);
    console.log(state);
    this.objectService.countFunction(states, state);
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

}
