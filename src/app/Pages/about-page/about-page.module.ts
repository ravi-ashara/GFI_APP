import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutPagePageRoutingModule } from './about-page-routing.module';

import { AboutPagePage } from './about-page.page';
import { ComponentsModule } from '../../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [AboutPagePage]
})
export class AboutPagePageModule { }
