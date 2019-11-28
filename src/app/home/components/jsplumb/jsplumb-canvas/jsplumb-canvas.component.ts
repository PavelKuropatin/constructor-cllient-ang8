import {AfterViewInit, Component, DoCheck, Input, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, OnInit} from '@angular/core';
import {jsPlumb, jsPlumbInstance} from 'jsplumb';
import 'jquery-ui';
import {Diagram} from '../../../../domain/diagram';
import {Canvas} from '../../../../domain/canvas';

declare var $: any;

@Component({
  selector: 'app-jsplumb-canvas',
  templateUrl: './jsplumb-canvas.component.html',
  styleUrls: ['./jsplumb-canvas.component.scss']
})
export class JsplumbCanvasComponent implements OnInit, AfterViewInit, DoCheck {

  @Input() canvas: Canvas;
  @Input() diagram: Diagram;

  jsPlumbInstance: jsPlumbInstance;

  private canvasWatcher: KeyValueDiffer<string, any>;
  private jsPlumbCanvas: any;

  constructor(private differs: KeyValueDiffers) {
  }

  ngOnInit() {
    this.jsPlumbInstance = jsPlumb.getInstance();
    this.canvasWatcher = this.differs.find(this.canvas).create();
  }

  ngAfterViewInit(): void {
    this.jsPlumbCanvas = $('#jsplumb-canvas');
    this.jsPlumbInstance.setContainer(this.jsPlumbCanvas);

    this.jsPlumbCanvas.draggable({
      stop: () => {
        const position = $(this.jsPlumbCanvas).position();
        this.canvas.x = position.left;
        this.canvas.y = position.top;
      }
    });

    this.zoomJsPlumbCanvas();

    $(this.jsPlumbCanvas).on('mousewheel', (e) => {

      if (e.originalEvent.wheelDelta / 200 > 0) {
        if (this.canvas.zoom < 200) {
          this.canvas.zoom += 10;
        }
      } else {
        if (this.canvas.zoom >= 20) {
          this.canvas.zoom -= 10;
        }
      }
    });

    this.jsPlumbInstance.bind('connection', (info, originalEvent) => {
      if (originalEvent && originalEvent.type === 'mouseup') {
        const targetUuid = $(info.target).attr('uuid');
        const sourceUuid = $(info.source).attr('uuid');
        console.log(sourceUuid);
        console.log(targetUuid);
      }
    });
  }

  canvasChanged(changes: KeyValueChanges<string, any>) {
    let zoom = null;
    changes.forEachChangedItem(r => {
      if (r.key === 'zoom') {
        zoom = r.currentValue;
      }
    });
    if (zoom) {
      this.canvas.zoom = zoom;
      this.zoomJsPlumbCanvas();
    }
  }

  zoomJsPlumbCanvas() {
    const zoom = (typeof this.canvas.zoom === 'undefined') ? 1 : this.canvas.zoom / 100;
    this.jsPlumbCanvas.css('transform', `scale(${zoom})`);
  }

  ngDoCheck(): void {
    const changes = this.canvasWatcher.diff(this.canvas);
    if (changes) {
      this.canvasChanged(changes);
    }
  }
}
