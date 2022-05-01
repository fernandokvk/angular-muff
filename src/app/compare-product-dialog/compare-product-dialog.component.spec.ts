import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareProductDialogComponent } from './compare-product-dialog.component';

describe('CompareProductDialogComponent', () => {
  let component: CompareProductDialogComponent;
  let fixture: ComponentFixture<CompareProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareProductDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
