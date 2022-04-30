import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSearchComponent } from './shop-search.component';

describe('ShopSearchComponent', () => {
  let component: ShopSearchComponent;
  let fixture: ComponentFixture<ShopSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
