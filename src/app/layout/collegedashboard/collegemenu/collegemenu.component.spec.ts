import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegemenuComponent } from './collegemenu.component';

describe('CollegemenuComponent', () => {
  let component: CollegemenuComponent;
  let fixture: ComponentFixture<CollegemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
