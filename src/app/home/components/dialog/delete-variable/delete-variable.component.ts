import {Component, Inject, OnInit} from '@angular/core';
import {Variable} from '../../../../domain/variable';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-variable',
  templateUrl: './delete-variable.component.html',
  styleUrls: ['./delete-variable.component.css']
})
export class DeleteVariableComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteVariableComponent>,
    @Inject(MAT_DIALOG_DATA) public variables: Variable[]
  ) {
  }

  ngOnInit() {
  }

  apply(variable: Variable) {
    this.dialogRef.close(variable);
  }

  cancel() {
    this.dialogRef.close();
  }

}
