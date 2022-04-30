import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyShoppingCartDialogComponent } from './empty-shopping-cart-dialog.component';

describe('EmptyShoppingCartDialogComponent', () => {
  let component: EmptyShoppingCartDialogComponent;
  let fixture: ComponentFixture<EmptyShoppingCartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyShoppingCartDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyShoppingCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
