import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCustomerFormComponent } from './select-customer-form.component';

describe('SelectCustomerFormComponent', () => {
  let component: SelectCustomerFormComponent;
  let fixture: ComponentFixture<SelectCustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCustomerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
