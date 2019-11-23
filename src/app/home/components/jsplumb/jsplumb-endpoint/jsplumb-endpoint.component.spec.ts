import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JsplumbEndpointComponent} from './jsplumb-endpoint.component';

describe('JsplumbEndpointComponent', () => {
  let component: JsplumbEndpointComponent;
  let fixture: ComponentFixture<JsplumbEndpointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JsplumbEndpointComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsplumbEndpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
