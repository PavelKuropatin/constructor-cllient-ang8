import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteVariableComponent} from './delete-variable.component';

describe('DeleteVariableComponent', () => {
  let component: DeleteVariableComponent;
  let fixture: ComponentFixture<DeleteVariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteVariableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
