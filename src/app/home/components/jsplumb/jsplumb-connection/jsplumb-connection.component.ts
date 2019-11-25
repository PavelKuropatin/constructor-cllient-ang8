import {Component, Input, OnInit} from '@angular/core';
import {jsPlumbInstance} from 'jsplumb';
import {State} from '../../../../domain/state';

@Component({
  selector: 'app-jsplumb-connection',
  templateUrl: './jsplumb-connection.component.html',
  styleUrls: ['./jsplumb-connection.component.scss']
})
export class JsplumbConnectionComponent implements OnInit {
  jsPlumbInstance: jsPlumbInstance;
  @Input() states: State[];

  constructor() {
  }

  ngOnInit() {
  }

}
