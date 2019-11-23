import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JsplumbCanvasComponent} from './jsplumb-canvas.component';

describe('JsplumbCanvasComponent', () => {
  let component: JsplumbCanvasComponent;
  let fixture: ComponentFixture<JsplumbCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JsplumbCanvasComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsplumbCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
