import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Diagram} from '../../../../domain/diagram';
import {ObjectHttpService} from '../../../services/object-http.service';

@Component({
  selector: 'app-open-diagram',
  templateUrl: './open-diagram.component.html',
  styleUrls: ['./open-diagram.component.css']
})
export class OpenDiagramComponent implements OnInit {

  diagrams: Diagram[];
  chosenUuid: string;

  constructor(
    private dialogRef: MatDialogRef<OpenDiagramComponent>,
    private objectHttpService: ObjectHttpService
    // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  ngOnInit() {
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

  chooseDiagram() {
    this.dialogRef.close(this.chosenUuid);
  }

  cancel() {
    this.dialogRef.close();
  }

}
