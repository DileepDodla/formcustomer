import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardCustomerFormComponent } from './onboard-customer-form.component';

describe('OnboardCustomerFormComponent', () => {
  let component: OnboardCustomerFormComponent;
  let fixture: ComponentFixture<OnboardCustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardCustomerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
