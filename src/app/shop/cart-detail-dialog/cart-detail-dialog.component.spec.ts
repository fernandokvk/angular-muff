import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailDialogComponent } from './cart-detail-dialog.component';

describe('CartDetailDialogComponent', () => {
  let component: CartDetailDialogComponent;
  let fixture: ComponentFixture<CartDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
