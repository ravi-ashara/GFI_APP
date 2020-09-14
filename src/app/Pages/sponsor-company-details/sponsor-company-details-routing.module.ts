import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SponsorCompanyDetailsPage } from './sponsor-company-details.page';

const routes: Routes = [
  {
    path: '',
    component: SponsorCompanyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SponsorCompanyDetailsPageRoutingModule {}
