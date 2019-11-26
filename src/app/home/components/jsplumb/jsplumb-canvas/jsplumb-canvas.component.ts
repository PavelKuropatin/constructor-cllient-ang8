import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {jsPlumbInstance} from 'jsplumb';
import 'jquery-ui';
import {Diagram} from '../../../../domain/diagram';

declare var $: any;

@Component({
  selector: 'app-jsplumb-canvas',
  templateUrl: './jsplumb-canvas.component.html',
  styleUrls: ['./jsplumb-canvas.component.scss']
})
export class JsplumbCanvasComponent implements OnInit, AfterViewInit {

  // @Input() zoom: number;
  // @Input() x: number;
  // @Input() y: number;
  // @Output() fOnConnection: EventEmitter<any> = new EventEmitter<any>();
  @Input() diagram: Diagram;

  @Input() jsPlumbInstance: jsPlumbInstance;
  private rootViewContainer: any;

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

    // const container = $('#container');
    // this.jsPlumbInstance.bind('connection', (info, originalEvent) => {
    //   if (originalEvent && originalEvent.type === 'mouseup') {
    //     const targetUuid = $(info.target).attr('uuid');
    //     const sourceUuid = $(info.source).attr('uuid');
    //     this.fOnConnection.emit([this.jsPlumbInstance, info.connection, targetUuid, sourceUuid]);
    //   }
    // });

    // this.jsPlumbInstance.setContainer(container);

    // const zoom = (typeof this.zoom === 'undefined') ? 1 : this.zoom / 100;
    // this.zoomJsPlumbCanvas(this.jsPlumbInstance, zoom, $(container)[0]);

    // scope.$watch('zoom', (newVal, oldVal) => {
    //   jsPlumbZoomCanvas(instance, newVal / 100, $(element)[0]);
    // });

    // $(container).bind('mousewheel', (e) => {
    //   if (e.originalEvent.wheelDelta / 200 > 0) {
    //     if (this.zoom < 200) {
    //       this.zoom += 10;
    //     }
    //   } else {
    //     if (this.zoom >= 20) {
    //       this.zoom -= 10;
    //     }
    //   }
    // });

  }

  zoomJsPlumbCanvas(instance: jsPlumbInstance, zoom: number, el, transformOrigin?) {
    transformOrigin = transformOrigin || [0, 0];
    const p = ['webkit', 'moz', 'ms', 'o'];
    const s = 'scale(' + zoom + ')';
    const oString = (transformOrigin[0] * 100) + '% ' + (transformOrigin[1] * 100) + '%';
    p.forEach((value) => {
      el.style[value + 'Transform'] = s;
      el.style[value + 'TransformOrigin'] = oString;
    });
    el.style.transform = s;
    el.style.transformOrigin = oString;
    // instance.setZoom(zoom);
  }

}
