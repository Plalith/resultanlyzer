import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentmenuComponent } from './studentmenu.component';

describe('StudentmenuComponent', () => {
  let component: StudentmenuComponent;
  let fixture: ComponentFixture<StudentmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
