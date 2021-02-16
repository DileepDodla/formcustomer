import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Customer } from '../customer.model';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-onboard-customer-form',
  templateUrl: './onboard-customer-form.component.html',
  styleUrls: ['./onboard-customer-form.component.css']
})
export class OnboardCustomerFormComponent implements OnInit {

  customerForm: FormGroup;
  customer: Customer;
  projectNos: Array<number>;
  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      projectNo: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern("^[0-9]+$")]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
      })
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.customer = this.customerForm.value;
      this.localStorageService.setItem('customerTable', this.customer);
      this.toastr.success("Saved data succesfully", "", { timeOut: 2000 });
    }
    else {
      this.customerForm.markAllAsTouched();
    }
  }

  onClear(): void {
    this.customerForm.reset();
    this.toastr.error("Cleared form data", "", { timeOut: 2000 });
  }

}
