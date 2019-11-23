import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModelingJsplumbConnectionComponent} from './modeling-jsplumb-connection.component';

describe('ModelingJsplumbConnectionComponent', () => {
  let component: ModelingJsplumbConnectionComponent;
  let fixture: ComponentFixture<ModelingJsplumbConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelingJsplumbConnectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelingJsplumbConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
