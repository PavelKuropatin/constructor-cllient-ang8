import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {AnchorId, EndpointOptions, jsPlumbInstance} from 'jsplumb';
import {State} from '../../../../domain/state';

declare var $: any;

@Component({
  selector: 'app-jsplumb-endpoint',
  templateUrl: './jsplumb-endpoint.component.html',
  styleUrls: ['./jsplumb-endpoint.component.scss']
})
export class JsplumbEndpointComponent implements OnInit, AfterViewInit {
  @Input() anchor: AnchorId;
  @Input() settings: EndpointOptions;
  @Input() uuid: string;
  @Input() state: State;
  @Input() jsPlumbInstance: jsPlumbInstance;


  constructor() {
  }

  ngOnInit() {

    let options = {
      anchor: this.anchor,
      uuid: this.uuid
    };
    // @ts-ignore
    const ep = this.jsPlumbInstance.addEndpoint(this.state.uuid, options, this.settings);
    console.log(ep);
    // scope.$on('$destroy', () => {
    //   instance.deleteEndpoint(ep);
    // });
  }

  ngAfterViewInit(): void {
    // this.jsPlumbInstance.draggable(this.uuid);
  }


}
