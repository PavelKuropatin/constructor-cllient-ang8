import {Component, Inject, OnInit} from '@angular/core';
import CONSTANTS from '../../../../config/business-constants';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModelingVariable} from '../../../../domain/modeling-variable';
import {ModelingSettings} from '../../../../domain/modeling-settings';

@Component({
  selector: 'app-start-count',
  templateUrl: './start-count.component.html',
  styleUrls: ['./start-count.component.css']
})
export class StartCountComponent implements OnInit {

  sourceTypes: string[];
  constants: object;
  selectedSourceType: string;

  constructor(
    private dialogRef: MatDialogRef<StartCountComponent>,
    @Inject(MAT_DIALOG_DATA) public modelingSettings: ModelingSettings
  ) {
  }

  ngOnInit() {
    if (this.modelingSettings) {
      this.selectedSourceType = this.modelingSettings.type;
    }

    this.sourceTypes = ['Generated', 'Socket'];
    this.constants = CONSTANTS;
  }

  apply() {
    this.dialogRef.close(this.modelingSettings);
  }

  cancel() {
    this.dialogRef.close();
  }

  addVariable() {
    if (this.modelingSettings.vars) {
      this.modelingSettings.vars = [];
    }

    this.modelingSettings.vars.push(new ModelingVariable('#', 0, 2));
  }

  deleteVariable(index) {
    this.modelingSettings.vars.splice(index, 1);
  }

}
