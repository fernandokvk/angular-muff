import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSelectedDialogComponent } from './shop-selected-dialog.component';

describe('ShopSelectedDialogComponent', () => {
  let component: ShopSelectedDialogComponent;
  let fixture: ComponentFixture<ShopSelectedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopSelectedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSelectedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
