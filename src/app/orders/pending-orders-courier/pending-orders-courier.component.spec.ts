import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrdersCourierComponent } from './pending-orders-courier.component';

describe('PendingOrdersCourierComponent', () => {
  let component: PendingOrdersCourierComponent;
  let fixture: ComponentFixture<PendingOrdersCourierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingOrdersCourierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingOrdersCourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
