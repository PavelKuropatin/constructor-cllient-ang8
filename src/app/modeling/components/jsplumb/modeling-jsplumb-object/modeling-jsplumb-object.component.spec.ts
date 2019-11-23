import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModelingJsplumbObjectComponent} from './modeling-jsplumb-object.component';

describe('ModelingJsplumbObjectComponent', () => {
  let component: ModelingJsplumbObjectComponent;
  let fixture: ComponentFixture<ModelingJsplumbObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelingJsplumbObjectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelingJsplumbObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
