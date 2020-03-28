import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPrivacyPolicyPageRoutingModule } from './event-privacy-policy-routing.module';

import { EventPrivacyPolicyPage } from './event-privacy-policy.page';
import { ComponentsModule } from '../../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPrivacyPolicyPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EventPrivacyPolicyPage]
})
export class EventPrivacyPolicyPageModule { }
