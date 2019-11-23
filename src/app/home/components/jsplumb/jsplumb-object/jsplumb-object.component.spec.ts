import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JsplumbObjectComponent} from './jsplumb-object.component';

describe('JsplumbObjectComponent', () => {
  let component: JsplumbObjectComponent;
  let fixture: ComponentFixture<JsplumbObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JsplumbObjectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsplumbObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
