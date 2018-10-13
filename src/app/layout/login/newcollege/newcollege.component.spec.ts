import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcollegeComponent } from './newcollege.component';

describe('NewcollegeComponent', () => {
  let component: NewcollegeComponent;
  let fixture: ComponentFixture<NewcollegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcollegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
