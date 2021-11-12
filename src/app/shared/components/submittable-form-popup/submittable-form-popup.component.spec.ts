import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittableFormPopupComponent } from './submittable-form-popup.component';

describe('SubmittableFormPopupComponent', () => {
  let component: SubmittableFormPopupComponent;
  let fixture: ComponentFixture<SubmittableFormPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittableFormPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittableFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
