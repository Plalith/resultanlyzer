import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackreportsComponent } from './feedbackreports.component';

describe('FeedbackreportsComponent', () => {
  let component: FeedbackreportsComponent;
  let fixture: ComponentFixture<FeedbackreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
