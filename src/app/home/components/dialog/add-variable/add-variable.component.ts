import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Variable} from '../../../../domain/variable';

@Component({
  selector: 'app-add-variable',
  templateUrl: './add-variable.component.html',
  styleUrls: ['./add-variable.component.css']
})
export class AddVariableComponent implements OnInit {

  variable: Variable;

  constructor(
    private dialogRef: MatDialogRef<AddVariableComponent>,
  ) {
  }

  ngOnInit() {
    this.variable = new Variable('x', 0);
  }

  apply() {
    this.dialogRef.close(this.variable);
  }

  cancel() {
    this.dialogRef.close();
  }
}
