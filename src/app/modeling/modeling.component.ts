import {Component, OnInit} from '@angular/core';
import {Diagram} from '../domain/diagram';
import {State} from '../domain/state';
import {Router} from '@angular/router';
import {ObjectHttpService} from '../home/services/object-http.service';
import {ObjectService} from '../home/services/object.service';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material';
import CONSTANTS from '../config/business-constants';
import ROUTES from '../config/route-constants';
import {Connection} from '../domain/connection';
import {OpenDiagramComponent} from '../home/components/dialog/open-diagram/open-diagram.component';
import {ModelingSettings} from '../domain/modeling-settings';
import {StartCountComponent} from './components/dialog/start-count/start-count.component';
import {SocketHttpService} from './services/http/socket-http.service';
import {SocketService} from './services/socket.service';
import {Variable} from '../domain/variable';
import {ContainerType} from '../domain/container-type.enum';
import {ImageHttpService} from './services/http/image-http.service';
import {ModelingJsPlumbStyleService} from './services/modeling-js-plumb-style.service';


@Component({
  selector: 'app-modeling',
  templateUrl: './modeling.component.html',
  styleUrls: ['./modeling.component.scss']
})
export class ModelingComponent implements OnInit {
  diagram: Diagram;
  zoomLevel: number;
  activeState: State;
  targetEndpointStyle1: object;
  targetEndpointStyle2: object;
  sourceEndpointStyle1: object;
  sourceEndpointStyle2: object;
  sortableOptions: object;
  isActiveSetting: boolean;
  movedStates: { states: State[] };
  backgroundImg: any;
  imageToUpload: object;
  modelingSettings: ModelingSettings;
  cmdUuid: string;
  // @ts-ignore
  timer: NodeJS.Timer; // ??? NodeJS.Timer;
  imageToLoad: File;

  constructor(
    private router: Router,
    private objectHttpService: ObjectHttpService,
    private objectService: ObjectService,
    private translate: TranslateService,
    private socketHttpService: SocketHttpService,
    private socketService: SocketService,
    private dialog: MatDialog,
    private modelingJsPlumbStyleService: ModelingJsPlumbStyleService,
    private imageHttpService: ImageHttpService
  ) {
  }

  ngOnInit() {
    this.zoomLevel = 64;
    this.targetEndpointStyle1 = this.modelingJsPlumbStyleService.getTargetEndpointStyle1();
    this.targetEndpointStyle2 = this.modelingJsPlumbStyleService.getTargetEndpointStyle2();
    this.sourceEndpointStyle1 = this.modelingJsPlumbStyleService.getSourceEndpointStyle1();
    this.sourceEndpointStyle2 = this.modelingJsPlumbStyleService.getSourceEndpointStyle2();
    this.isActiveSetting = true;
    this.sortableOptions = {
      connectWith: '.connectedItems'
    };
    this.movedStates = {states: []};
    this.imageToUpload = null;
    console.log(CONSTANTS);

  }

  goToSchema() {
    this.router.navigate([ROUTES.SCHEMA]);
  }

  refresh() {
    this.movedStates.states = this.movedStates.states.splice(0, this.movedStates.states.length);
  }

  setActiveState(state: State) {
    this.activeState = state;
  }

  inverseConnectionVisibility(connection: Connection) {
    connection.isVisible = !connection.isVisible;
  }

  isActiveState(state: State) {
    return this.activeState === state;
  }

  resetStates(diagram: Diagram) {
    diagram.states.forEach(state => {
      state.template = `custom_${state.template}`;
      state.x = 10;
      state.y = 10;
    });
  }

  refreshStates() {
    const bufferedStates = this.movedStates.states;
    this.movedStates.states = [];
    setTimeout(() => this.movedStates.states = bufferedStates);
  }

  startCounter() {
    if (!this.timer) {
      this.updateCounter();
    }
  }

  changeParam() {
    this.movedStates.states.forEach(state => {
      state.inputContainer.forEach(item => {
        const values = this.modelingSettings.vars.find(sVar => sVar.name === item.label);
        if (values) {
          item.value = values.startValue;
        }
      });
      this.objectService.countFunction(this.movedStates.states, state);

    });
  }

  updateCounter() {
    this.modelingSettings.vars.forEach(sVar => {
      sVar.startValue += sVar.stepValue;
    });
    this.changeParam();
    this.timer = setInterval(this.updateCounter, this.modelingSettings.interval);
  }

  openModelingSettings() {
    const dialogRef = this.dialog.open(StartCountComponent, {
      data: this.modelingSettings
    });

    dialogRef.afterClosed()
      .subscribe(modelingSettings => {
        this.modelingSettings = modelingSettings;
        switch (this.modelingSettings.type) {
          case CONSTANTS.MODEL.GENERATOR:
            this.startCounter();
            break;
          case CONSTANTS.MODEL.SOCKET:
            this.socketService.connect(this.onSocketMessage);
            this.socketHttpService.startGetState(this.modelingSettings).subscribe(cmdUuid => {
              this.cmdUuid = cmdUuid;
            });
            break;
        }
      });
  }

  onSocketMessage(message: string) {
    const out: object = JSON.parse(message);
    console.log(message);
    this.movedStates.states.forEach(state => {
      if (state.name in out) {
        state.outputContainer = [new Variable('x', out[state.name], ContainerType.OUTPUT, '')];
      }
    });
  }

  openDiagram() {
    const dialogRef = this.dialog.open(OpenDiagramComponent, {});

    dialogRef.afterClosed()
      .subscribe(diagramUuid => {
        this.objectHttpService.getDiagram(diagramUuid)
          .subscribe(diagram => this.diagram = diagram);
      });
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  stopCount() {
    switch (this.modelingSettings.type) {
      case CONSTANTS.MODEL.GENERATOR:
        this.timer.unref(); // todo
        this.timer = null;
        break;
      case CONSTANTS.MODEL.SOCKET:
        this.socketHttpService.stopMonitor(this.cmdUuid);
        break;
    }
  }

  uploadImage() {
    console.log(this.imageToUpload);
    this.imageHttpService.getImages().subscribe(images => console.log(images));
  }

  selectImage() {
    // $('input[type="file"]').click();
  }

  onFilesSelect(files: FileList) {
    console.log(files);
    if (files) {
      this.imageToLoad = files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.imageToLoad);
      fileReader.onload = () => {
        this.backgroundImg = fileReader.result;
        const image = new Image();
        image.onload = () => {
          console.log(image.width);
          console.log(image.height);
          // $('custom-js-plumb-canvas')
          //   .css({
          //     minWidth: img.width + 'px',
          //     minHeight: img.height + 'px',
          //     'background-image': 'url(' + result + ')'
          //   });
        };
        // @ts-ignore
        image.src = fileReader.result;
      };
    }

  }
}
