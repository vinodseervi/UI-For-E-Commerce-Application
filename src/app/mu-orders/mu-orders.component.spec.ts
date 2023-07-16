import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuOrdersComponent } from './mu-orders.component';

describe('MuOrdersComponent', () => {
  let component: MuOrdersComponent;
  let fixture: ComponentFixture<MuOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MuOrdersComponent]
    });
    fixture = TestBed.createComponent(MuOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
