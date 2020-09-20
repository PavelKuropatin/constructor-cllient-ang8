import {AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Block} from '../../../domain/block';
import {ObjectService} from '../../services/object.service';
import {JsPlumbStyleService} from '../../services/js-plumb-style.service';
import CONSTANTS from '../../../config/business-constants';
import {jsPlumbInstance} from 'jsplumb';
import {Schema} from '../../../domain/schema';
import {JsplumbCanvasComponent} from '../jsplumb/jsplumb-canvas/jsplumb-canvas.component';


@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() state: Block;
  @Input() diagram: Schema;

  jsPlumbInstance: jsPlumbInstance;
  readonly CONSTANTS = CONSTANTS;

  private te1: object;
  private te2: object;
  private se1: object;
  private se2: object;

  constructor(
    private objectService: ObjectService,
    private jsPlumbStyleService: JsPlumbStyleService,
    @Inject(JsplumbCanvasComponent) private parent: JsplumbCanvasComponent
  ) {
    this.jsPlumbInstance = parent.jsPlumbInstance;
    this.te1 = this.jsPlumbStyleService.getTargetEndpointStyle1();
    this.te2 = this.jsPlumbStyleService.getTargetEndpointStyle2();
    this.se1 = this.jsPlumbStyleService.getSourceEndpointStyle1();
    this.se2 = this.jsPlumbStyleService.getSourceEndpointStyle2();
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

    this.jsPlumbInstance.draggable(this.state.uuid, {
      drag: (event) => {
        this.state.x = event.pos[0];
        this.state.y = event.pos[1];
      }
    });
  }

  ngOnDestroy(): void {
    // this.jsPlumbInstance.deleteEndpoint(this.sp).deleteEndpoint(this.tp);
  }


  countFunction(states: Block[], state: Block) {
    this.objectService.countFunction(states, state);
  }

}
