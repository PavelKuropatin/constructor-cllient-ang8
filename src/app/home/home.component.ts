import {Component, OnInit} from '@angular/core';
import {ObjectHttpService} from './services/object-http.service';
import {Diagram} from '../domain/diagram';
import ROUTES from '../config/route-constants';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material';
import {ObjectService} from './services/object.service';
import {JsPlumbStyleService} from './services/js-plumb-style.service';
import {State} from '../domain/state';
import {OpenDiagramComponent} from './components/dialog/open-diagram/open-diagram.component';
import {Connection} from '../domain/connection';
import {Target} from '../domain/target';
import {jsPlumb, jsPlumbInstance} from 'jsplumb';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  diagram: Diagram;
  zoomLevel: number;
  x = 0;
  y = 0;
  activeState: State;
  targetEndpointStyle1: object;
  targetEndpointStyle2: object;
  sourceEndpointStyle1: object;
  sourceEndpointStyle2: object;
  isActiveSetting: boolean;
  jsPlumbInstance: jsPlumbInstance;

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
    this.jsPlumbInstance = jsPlumb.getInstance();

    this.zoomLevel = 64;
    this.targetEndpointStyle1 = this.jsPlumbStyleService.getTargetEndpointStyle1();
    this.targetEndpointStyle2 = this.jsPlumbStyleService.getTargetEndpointStyle2();
    this.sourceEndpointStyle1 = this.jsPlumbStyleService.getSourceEndpointStyle1();
    this.sourceEndpointStyle2 = this.jsPlumbStyleService.getSourceEndpointStyle2();
    this.isActiveSetting = false;
    this.objectHttpService.getDiagram('53e34ea9-4916-4ec0-9c4e-2925654d9320')
      .subscribe(diagram => this.diagram = diagram);
    this.diagram = new Diagram([]);
  }

  goToModeling() {
    this.router.navigate([ROUTES.MODELING]);
  }

  setActiveState(state: State) {
    this.activeState = state;
  }

  onConnection(instance, connection: Connection, targetUuid: string, sourceUuid: string) {
    this.diagram.states.forEach(state => {
      if (state.source.uuid === sourceUuid) {
        state.source.connections.push(new Connection(new Target(targetUuid), true));
      }
    });
    this.objectService.updateContainer(this.diagram.states, sourceUuid, targetUuid);
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
