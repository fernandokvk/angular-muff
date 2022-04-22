import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoSelectedDialogComponent } from './cartao-selected-dialog.component';

describe('CartaoSelectedDialogComponent', () => {
  let component: CartaoSelectedDialogComponent;
  let fixture: ComponentFixture<CartaoSelectedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaoSelectedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaoSelectedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
