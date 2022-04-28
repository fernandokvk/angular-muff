import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCourierDialogComponent } from './select-courier-dialog.component';

describe('SelectCourierDialogComponent', () => {
  let component: SelectCourierDialogComponent;
  let fixture: ComponentFixture<SelectCourierDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCourierDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCourierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
