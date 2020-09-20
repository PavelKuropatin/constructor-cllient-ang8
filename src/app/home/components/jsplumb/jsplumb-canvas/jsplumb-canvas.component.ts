import {
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
  Output
} from '@angular/core';
import {jsPlumb, jsPlumbInstance} from 'jsplumb';
import 'jquery-ui';
import {Schema} from '../../../../domain/schema';
import {Canvas} from '../../../../domain/canvas';

declare var $: any;

@Component({
  selector: 'app-jsplumb-canvas',
  templateUrl: './jsplumb-canvas.component.html',
  styleUrls: ['./jsplumb-canvas.component.scss']
})
export class JsplumbCanvasComponent implements OnInit, AfterViewInit, DoCheck {

  @Input() canvas: Canvas;
  @Input() diagram: Schema;
  @Output() onConnection: EventEmitter<any> = new EventEmitter<any>();
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
        const targetStateUuid = $(info.target).attr('id');
        const sourceStateUuid = $(info.source).attr('id');
        this.onConnection.emit({source: sourceStateUuid, target: targetStateUuid});
      }
    });

    setTimeout(() => this.showConnections(), 1000);

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

  showConnections() {
    this.diagram.states.forEach(state => {

      const sourceUuid = state.source.uuid;
      state.source.connections.forEach(connection => {
        const params = {
          uuids: [
            sourceUuid,
            connection.target.uuid
          ],
          paintStyle: {
            strokeWidth: 6,
            stroke: '#61B7CF'
          },
          connector: ['Flowchart', {stub: [30, 30], gap: 20, cornerRadius: 10, alwaysRespectStubs: true}]
        };
        // @ts-ignore
        this.jsPlumbInstance.connect(params);
      });
    });

  }

  ngDoCheck(): void {
    const changes = this.canvasWatcher.diff(this.canvas);
    if (changes) {
      this.canvasChanged(changes);
    }
  }

}
