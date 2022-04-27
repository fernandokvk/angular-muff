import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCourierComponent } from './new-courier.component';

describe('NewCourierComponent', () => {
  let component: NewCourierComponent;
  let fixture: ComponentFixture<NewCourierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCourierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
