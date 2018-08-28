import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckresultComponent } from './checkresult.component';

describe('CheckresultComponent', () => {
  let component: CheckresultComponent;
  let fixture: ComponentFixture<CheckresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
