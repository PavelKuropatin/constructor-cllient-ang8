import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModelingJsplumbCanvasComponent} from './modeling-jsplumb-canvas.component';

describe('ModelingJsplumbCanvasComponent', () => {
  let component: ModelingJsplumbCanvasComponent;
  let fixture: ComponentFixture<ModelingJsplumbCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelingJsplumbCanvasComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelingJsplumbCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
