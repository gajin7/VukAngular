import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditInterventionComponent } from './create-edit-intervention.component';

describe('CreateEditInterventionComponent', () => {
  let component: CreateEditInterventionComponent;
  let fixture: ComponentFixture<CreateEditInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditInterventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
