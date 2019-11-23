import {Component, OnInit} from '@angular/core';
import {State} from '../../../domain/state';
import {ObjectService} from '../../services/object.service';
import {ObjectHttpService} from '../../services/object-http.service';
import CONSTANTS from '../../../config/business-constants';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
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
    this.icons = Object.keys(CONSTANTS.ENDPOINT_LAYOUTS);
    this.state = this.objectService.getConfigState();
    this.countFunction = this.objectService.countFunction;
    this.sourceLayout = this.getByAnchor(this.state.style.sourceAnchor);
    this.targetLayout = this.getByAnchor(this.state.style.targetEndpoint);
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