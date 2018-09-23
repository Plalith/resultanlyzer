import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewresultlComponent } from './viewresultl.component';

describe('ViewresultlComponent', () => {
  let component: ViewresultlComponent;
  let fixture: ComponentFixture<ViewresultlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewresultlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewresultlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
