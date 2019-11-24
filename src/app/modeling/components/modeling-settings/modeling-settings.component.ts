import {Component, OnInit} from '@angular/core';
import {State} from '../../../domain/state';
import {ObjectService} from '../../../home/services/object.service';
import CONSTANTS from '../../../config/business-constants';
import {ObjectHttpService} from '../../../home/services/object-http.service';

@Component({
  selector: 'app-modeling-settings',
  templateUrl: './modeling-settings.component.html',
  styleUrls: ['./modeling-settings.component.scss']
})
export class ModelingSettingsComponent implements OnInit {
  private actions: string[];
  private icons: string[];
  private state: State;
  private countFunction: (states: State[], state: State) => any;
  private sourceLayout: string;
  private targetLayout: string;

  constructor(
    private objectService: ObjectService,
    private objectHttpService: ObjectHttpService,
  ) {
  }

  ngOnInit() {
    this.actions = ['set_image', 'stop_exec'];
    this.icons = Object.keys(CONSTANTS.ENDPOINT_LAYOUTS);
    this.state = this.objectService.getConfigState();
    this.countFunction = this.objectService.countFunction;
    console.log(this.state);
    this.sourceLayout = this.getByAnchor(this.state.style.sourceAnchor);
    this.targetLayout = this.getByAnchor(this.state.style.targetAnchor);
  }

  apply() {
    this.state.style = Object.assign(this.state.style, {
      sourceAnchor: CONSTANTS.ENDPOINT_LAYOUTS[this.sourceLayout].a,
      sourceEndpoint: CONSTANTS.ENDPOINT_LAYOUTS[this.sourceLayout].e,
      targetAnchor: CONSTANTS.ENDPOINT_LAYOUTS[this.targetLayout].a,
      targetEndpoint: CONSTANTS.ENDPOINT_LAYOUTS[this.targetLayout].e
    });
    console.log(this.state.settings);
    this.objectHttpService.saveStateSettings(this.state.uuid, this.state.settings)
      .subscribe(response => console.log(response));
  }


  refreshNumbers() {
    this.state.settings.actions.forEach((action, i) => action.number = i + 1);
  }

  deleteSettingsAction(actionUuid) {
    this.objectHttpService.deleteSettingsAction(this.state.uuid, actionUuid)
      .subscribe(_ => {
        this.objectHttpService.getStateSettings(this.state.uuid)
          .subscribe(settings => {
            console.log(settings);
            this.state.settings = settings;
          });
      });
  }

  addSettingsAction(stateUuid: string) {
    this.objectHttpService.addSettingsAction(stateUuid)
      .subscribe(settings => {
        console.log(settings);
        this.state.settings = settings;
      });
  }

  private getByAnchor(endpointAnchor: string) {
    switch (endpointAnchor) {
      case CONSTANTS.ANCHOR.TOP_CENTER:
        return 'border_top';
      case CONSTANTS.ANCHOR.BOTTOM_CENTER:
        return 'border_bottom';
      case CONSTANTS.ANCHOR.LEFT_MIDDLE:
        return 'border_left';
      case CONSTANTS.ANCHOR.RIGHT_MIDDLE:
        return 'border_right';
    }
  }


}
