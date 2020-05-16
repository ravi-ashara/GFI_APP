import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SponsorCompanyDetailsPageRoutingModule } from './sponsor-company-details-routing.module';

import { SponsorCompanyDetailsPage } from './sponsor-company-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SponsorCompanyDetailsPageRoutingModule
  ],
  declarations: [SponsorCompanyDetailsPage]
})
export class SponsorCompanyDetailsPageModule {}
