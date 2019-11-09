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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  diagram: Diagram;
  zoomLevel: number;
  activeState: State;
  targetEndpointStyle1: object;
  targetEndpointStyle2: object;
  sourceEndpointStyle1: object;
  sourceEndpointStyle2: object;
  isActiveSetting: boolean;
  countFunction = this.objectService.countFunction;

  constructor(
    private router: Router,
    private objectHttpService: ObjectHttpService,
    private objectService: ObjectService,
    private translate: TranslateService,
    private mdDialog: MatDialog,
    private jsPlumbStyleService: JsPlumbStyleService
  ) {
  }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.zoomLevel = 64;
    this.targetEndpointStyle1 = this.jsPlumbStyleService.getTargetEndpointStyle1();
    this.targetEndpointStyle2 = this.jsPlumbStyleService.getTargetEndpointStyle2();
    this.sourceEndpointStyle1 = this.jsPlumbStyleService.getSourceEndpointStyle1();
    this.sourceEndpointStyle2 = this.jsPlumbStyleService.getSourceEndpointStyle2();
    this.isActiveSetting = true;
  }

  goToModeling() {
    this.router.navigate([ROUTES.MODELING]);
  }

  setActiveState(state: State) {
    this.activeState = state;
  }

  onConnection(instance, connection, outTarget, outSource) {
    this.diagram.states.forEach(state => {
      state.sources.forEach(source => {
        if (source === outSource) {
          source.connections.push({uuid: outTarget, isVisible: true});
        }
      });
    });
    this.objectService.updateContainer(this.diagram.states, outSource, outTarget);
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
    const dialogRef = this.mdDialog.open(OpenDiagramComponent, {});

    dialogRef.afterClosed()
      .subscribe(diagramUuid => {
        this.objectHttpService.getDiagram(diagramUuid)
          .subscribe(diagram => this.diagram = diagram);
      });
  }

  changeLanguage(language) {
    this.translate.use(language);
  }
}
