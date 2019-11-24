import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Diagram} from '../../../../domain/diagram';
import {ObjectHttpService} from '../../../services/object-http.service';

@Component({
  selector: 'app-open-diagram',
  templateUrl: './open-diagram.component.html',
  styleUrls: ['./open-diagram.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OpenDiagramComponent implements OnInit {

  diagrams: Diagram[];
  chosenUuid: string;
  displayedColumns: string[];
  diagramColumns: string[];

  constructor(
    private dialogRef: MatDialogRef<OpenDiagramComponent>,
    private objectHttpService: ObjectHttpService
  ) {
  }

  ngOnInit() {
    this.displayedColumns = ['name', 'action'];
    this.diagramColumns = ['name'];
    this.objectHttpService.getDiagrams()
      .subscribe(diagrams => {
        this.diagrams = diagrams;
        if (this.diagrams.length) {
          this.chosenUuid = this.diagrams[0].uuid;
        }
      });
  }

  deleteDiagram(diagramUuid) {
    this.objectHttpService.deleteDiagram(diagramUuid)
      .subscribe(_ => this.ngOnInit());
  }

  setDiagramToLoad(diagramUuid) {
    this.chosenUuid = diagramUuid;
  }

  apply() {
    this.dialogRef.close(this.chosenUuid);
  }

  cancel() {
    this.dialogRef.close();
  }

}
