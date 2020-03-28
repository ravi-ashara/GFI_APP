import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermofServicePageRoutingModule } from './termof-service-routing.module';

import { TermofServicePage } from './termof-service.page';
import { ComponentsModule } from '../../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermofServicePageRoutingModule,
    ComponentsModule
  ],
  declarations: [TermofServicePage]
})
export class TermofServicePageModule { }
