import {Component, OnInit} from '@angular/core';
import {ObjectHttpService} from './services/object-http.service';
import {Schema} from '../domain/schema';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material';
import {ObjectService} from './services/object.service';
import {JsPlumbStyleService} from './services/js-plumb-style.service';
import {Block} from '../domain/block';
import {OpenDiagramComponent} from './components/dialog/open-diagram/open-diagram.component';
import {Connection} from '../domain/connection';
import {Canvas} from '../domain/canvas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  diagram: Schema;
  canvas: Canvas;
  // fullState: Block;
  settingsState: Block;
  targetEndpointStyle1: object;
  targetEndpointStyle2: object;
  sourceEndpointStyle1: object;
  sourceEndpointStyle2: object;
  isActiveSetting: boolean;

  constructor(
    private router: Router,
    private objectHttpService: ObjectHttpService,
    private objectService: ObjectService,
    private translate: TranslateService,
    private dialog: MatDialog,
    private jsPlumbStyleService: JsPlumbStyleService
  ) {
  }

  ngOnInit() {
    this.canvas = new Canvas(80);
    this.targetEndpointStyle1 = this.jsPlumbStyleService.getTargetEndpointStyle1();
    this.targetEndpointStyle2 = this.jsPlumbStyleService.getTargetEndpointStyle2();
    this.sourceEndpointStyle1 = this.jsPlumbStyleService.getSourceEndpointStyle1();
    this.sourceEndpointStyle2 = this.jsPlumbStyleService.getSourceEndpointStyle2();
    this.isActiveSetting = false;
    this.diagram = new Schema([]);
    this.objectHttpService.getDiagram('53e34ea9-4916-4ec0-9c4e-2925654d9320')
      .subscribe(diagram => this.diagram = diagram);
    this.settingsState = null;
  }

  goToModeling() {
    console.log(this.canvas);
    // this.router.navigate([ROUTES.MODELING]);
  }

  showStateSettings(state: Block) {
    this.settingsState = state;
  }

  addConnection(data, instance?, connection?) {
    const stateSourceUuid = data.source;
    const stateTargetUuid = data.target;

    const sourceState = this.diagram.states.find(s => s.uuid === stateSourceUuid);
    const targetState = this.diagram.states.find(s => s.uuid === stateTargetUuid);

    this.diagram.states
      .find(s => s.uuid === stateSourceUuid)
      .source.connections.push(new Connection(targetState.target, true));

    this.objectService.updateContainer(this.diagram.states, sourceState, targetState);

    this.updateDiagram();
  }

  updateDiagram() {
    this.objectHttpService.updateDiagram(this.diagram)
      .subscribe(diagram => this.diagram = diagram);
  }

  createNewDiagram() {
    this.objectHttpService.createNewDiagram()
      .subscribe(diagram => this.diagram = diagram);
  }

  openDiagram() {
    const dialogRef = this.dialog.open(OpenDiagramComponent, {panelClass: 'no-dialog-padding'});
    dialogRef.afterClosed()
      .subscribe(diagramUuid => {
        if (diagramUuid) {
          this.objectHttpService.getDiagram(diagramUuid)
            .subscribe(diagram => this.diagram = diagram);
        }
      });
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }

}
