import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModelingJsplumbEndpointComponent} from './modeling-jsplumb-endpoint.component';

describe('ModelingJsplumbEndpointComponent', () => {
  let component: ModelingJsplumbEndpointComponent;
  let fixture: ComponentFixture<ModelingJsplumbEndpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelingJsplumbEndpointComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelingJsplumbEndpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
