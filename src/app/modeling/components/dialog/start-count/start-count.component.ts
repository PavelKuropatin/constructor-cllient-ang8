import {Component, Inject, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import CONSTANTS from '../../../../config/business-constants';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModelingVariable} from '../../../../domain/modeling-variable';
import {ModelingSettings} from '../../../../domain/modeling-settings';

@Component({
  selector: 'app-start-count',
  templateUrl: './start-count.component.html',
  styleUrls: ['./start-count.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StartCountComponent implements OnInit {

  readonly CONSTANTS = CONSTANTS;
  readonly sources = Object.values(CONSTANTS.MODEL);

  constructor(
    private dialog: MatDialogRef<StartCountComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public modelingSettings: ModelingSettings
  ) {

    if (!this.modelingSettings) {
      this.modelingSettings = new ModelingSettings();
      this.modelingSettings.type = this.sources[0];
    }
  }

  ngOnInit() {
  }

  apply() {
    this.dialog.close(this.modelingSettings);
  }

  cancel() {
    this.dialog.close();
  }

  addVariable() {
    if (!this.modelingSettings.vars) {
      this.modelingSettings.vars = [];
    }

    this.modelingSettings.vars.push(new ModelingVariable('#', 0, 2));
  }

  deleteVariable(index) {
    this.modelingSettings.vars.splice(index, 1);
  }

}
