import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminfeedbackComponent } from './adminfeedback.component';

describe('AdminfeedbackComponent', () => {
  let component: AdminfeedbackComponent;
  let fixture: ComponentFixture<AdminfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
