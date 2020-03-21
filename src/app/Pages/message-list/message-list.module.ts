import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageListPageRoutingModule } from './message-list-routing.module';

import { MessageListPage } from './message-list.page';
import { ComponentsModule } from '../../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MessageListPage]
})
export class MessageListPageModule { }
