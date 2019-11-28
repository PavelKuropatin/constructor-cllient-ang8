import {AfterViewInit, Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ActionComponent} from '../../action/action.component';
import {jsPlumbInstance} from 'jsplumb';

@Component({
  selector: 'app-jsplumb-endpoint',
  templateUrl: './jsplumb-endpoint.component.html',
  styleUrls: ['./jsplumb-endpoint.component.scss']
})
export class JsplumbEndpointComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() anchor: string;
  @Input() uuid: string;
  @Input() settings: object;
  jsPlumbInstance: jsPlumbInstance;
  private endpoint: any;

  constructor(
    @Inject(ActionComponent) private parent: ActionComponent
  ) {
    this.jsPlumbInstance = parent.jsPlumbInstance;
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    const options = {
      anchor: this.anchor,
      uuid: this.uuid
    };
    // @ts-ignore
    this.endpoint = this.jsPlumbInstance.addEndpoint(this.uuid, this.settings, options);
  }

  ngOnDestroy(): void {
    this.jsPlumbInstance.deleteEndpoint(this.uuid);
  }

}
