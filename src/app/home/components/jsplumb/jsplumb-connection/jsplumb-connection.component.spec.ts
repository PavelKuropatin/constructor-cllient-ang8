import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JsplumbConnectionComponent} from './jsplumb-connection.component';

describe('JsplumbConnectionComponent', () => {
  let component: JsplumbConnectionComponent;
  let fixture: ComponentFixture<JsplumbConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JsplumbConnectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsplumbConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
