import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateShopComponent } from './rate-shop.component';

describe('RateShopComponent', () => {
  let component: RateShopComponent;
  let fixture: ComponentFixture<RateShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
