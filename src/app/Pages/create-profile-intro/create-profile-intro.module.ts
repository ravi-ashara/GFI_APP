import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateProfileIntroPageRoutingModule } from './create-profile-intro-routing.module';

import { CreateProfileIntroPage } from './create-profile-intro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateProfileIntroPageRoutingModule
  ],
  declarations: [CreateProfileIntroPage]
})
export class CreateProfileIntroPageModule {}
