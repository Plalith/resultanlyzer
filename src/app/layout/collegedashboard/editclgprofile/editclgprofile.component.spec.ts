import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditclgprofileComponent } from './editclgprofile.component';

describe('EditclgprofileComponent', () => {
  let component: EditclgprofileComponent;
  let fixture: ComponentFixture<EditclgprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditclgprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditclgprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
