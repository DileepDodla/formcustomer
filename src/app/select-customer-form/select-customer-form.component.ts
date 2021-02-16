import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../customer.model';
import { Invoice } from '../invoice.model';
import { LocalStorageService } from '../local-storage.service';

import { PdfService } from '../pdf.service';

@Component({
  selector: 'app-select-customer-form',
  templateUrl: './select-customer-form.component.html',
  styleUrls: ['./select-customer-form.component.css']
})
export class SelectCustomerFormComponent implements OnInit {
  // radioButtonForNameEmail: String = "name";
  invoiceForm: FormGroup;
  customerNames: string[];
  invoice: Invoice;
  private customerTable: Array<Customer>;
  private customer: Customer;

  constructor(private fb: FormBuilder, private pdfService: PdfService, private localStorageService: LocalStorageService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.customerTable = JSON.parse(this.localStorageService.getItem('customerTable'));
    if (this.customerTable)
      // this.customerNames = Array.from(new Set(customerTable.map(el => el.name)));
      this.customerNames = this.customerTable.map(el => el.name);
    else
      this.customerNames = [];
    this.invoiceForm = this.fb.group({
      customerName: ['', Validators.required],
      numberOfHours: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      hourlyRate: ['', [Validators.required, Validators.min(1)]],
      tax: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.invoiceForm.valid) {
      this.invoice = this.invoiceForm.value;
      this.localStorageService.setItem('invoiceTable', this.invoice);
      this.toastr.success("Saved data successfully", "", { timeOut: 2000 });
    }
    else {
      this.invoiceForm.markAllAsTouched();
    }
  }

  onClear(): void {
    this.invoiceForm.reset();
    this.toastr.error("Cleared form data", "", { timeOut: 2000 });
  }

  generatePdf(): void {
    this.customer = this.customerTable.filter(e => e.name == this.invoiceForm.value.customerName)[0];
    this.pdfService.generatePdf(this.customer, this.invoiceForm.value);
  }

}
