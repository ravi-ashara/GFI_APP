import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactOrganizerPageRoutingModule } from './contact-organizer-routing.module';

import { ContactOrganizerPage } from './contact-organizer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactOrganizerPageRoutingModule
  ],
  declarations: [ContactOrganizerPage]
})
export class ContactOrganizerPageModule {}
