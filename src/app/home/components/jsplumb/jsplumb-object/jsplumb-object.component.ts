import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {State} from '../../../../domain/state';
import {jsPlumbInstance} from 'jsplumb';

declare var $: any;

@Component({
  selector: 'app-jsplumb-object',
  templateUrl: './jsplumb-object.component.html',
  styleUrls: ['./jsplumb-object.component.scss']
})
export class JsplumbObjectComponent implements OnInit, AfterViewInit {

  @Input() state: State;
  @Input() jsPlumbInstance: jsPlumbInstance;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

    // TODO INIT ALL
    this.jsPlumbInstance.draggable(this.state.uuid);
    // this.jsPlumbInstance.draggable(this.element, {
    //   drag: (event) => {
    //     console.log(event);
    //     this.state.x = event.pos[0];
    //     this.state.y = event.pos[1];
    //   }
    // });
  }


}
