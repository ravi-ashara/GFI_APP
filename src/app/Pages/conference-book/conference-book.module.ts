import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConferenceBookPageRoutingModule } from './conference-book-routing.module';

import { ConferenceBookPage } from './conference-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConferenceBookPageRoutingModule
  ],
  declarations: [ConferenceBookPage]
})
export class ConferenceBookPageModule {}
