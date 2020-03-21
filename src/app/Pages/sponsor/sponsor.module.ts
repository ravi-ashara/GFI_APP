import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SponsorPageRoutingModule } from './sponsor-routing.module';

import { SponsorPage } from './sponsor.page';
import { ComponentsModule } from '../../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SponsorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SponsorPage]
})
export class SponsorPageModule {}
