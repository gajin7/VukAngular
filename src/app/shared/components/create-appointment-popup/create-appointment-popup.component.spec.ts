import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppointmentPopupComponent } from './create-appointment-popup.component';

describe('CreateAppointmentPopupComponent', () => {
  let component: CreateAppointmentPopupComponent;
  let fixture: ComponentFixture<CreateAppointmentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAppointmentPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppointmentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
