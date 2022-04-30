import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrdersCustomerComponent } from './pending-orders-customer.component';

describe('PendingOrdersCustomerComponent', () => {
  let component: PendingOrdersCustomerComponent;
  let fixture: ComponentFixture<PendingOrdersCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingOrdersCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingOrdersCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
