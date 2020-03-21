import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactOrganizerPageRoutingModule } from './contact-organizer-routing.module';

import { ContactOrganizerPage } from './contact-organizer.page';
import { ComponentsModule } from '../../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactOrganizerPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ContactOrganizerPage]
})
export class ContactOrganizerPageModule { }
