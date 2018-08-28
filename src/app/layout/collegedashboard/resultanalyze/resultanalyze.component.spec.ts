import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultanalyzeComponent } from './resultanalyze.component';

describe('ResultanalyzeComponent', () => {
  let component: ResultanalyzeComponent;
  let fixture: ComponentFixture<ResultanalyzeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultanalyzeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultanalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
