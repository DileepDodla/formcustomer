import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnboardCustomerFormComponent } from './onboard-customer-form/onboard-customer-form.component';
import { SelectCustomerFormComponent } from './select-customer-form/select-customer-form.component';

const routes: Routes = [
  { path: 'onboard-customer', component: OnboardCustomerFormComponent },
  { path: 'generate-invoice', component: SelectCustomerFormComponent },
  { path: '', redirectTo: '/onboard-customer', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
