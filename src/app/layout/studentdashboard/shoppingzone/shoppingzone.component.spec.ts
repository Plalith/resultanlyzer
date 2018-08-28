import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingzoneComponent } from './shoppingzone.component';

describe('ShoppingzoneComponent', () => {
  let component: ShoppingzoneComponent;
  let fixture: ComponentFixture<ShoppingzoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingzoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
