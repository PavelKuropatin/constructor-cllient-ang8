import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modeling-jsplumb-canvas',
  templateUrl: './modeling-jsplumb-canvas.component.html',
  styleUrls: ['./modeling-jsplumb-canvas.component.css']
})
export class ModelingJsplumbCanvasComponent implements OnInit {

  @Input() onConnection: () => any;
  @Input() x: number;
  @Input() y: number;
  @Input() zoom: number;

  constructor() {
  }

  ngOnInit() {
  }

}
