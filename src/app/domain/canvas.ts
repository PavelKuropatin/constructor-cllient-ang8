export class Canvas {
  x: number;
  y: number;
  zoom: number;

  constructor(zoom?: number, x?: number, y?: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.zoom = zoom || 60;
  }
}
