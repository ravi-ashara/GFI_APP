import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CommonHeaderComponent } from './common-header/common-header.component';
import { MeetingDetailEditComponent } from './meeting-detail-edit/meeting-detail-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CommonHeaderComponent,
        MeetingDetailEditComponent
    ],
    imports: [CommonModule, FormsModule, IonicModule],
    exports: [
        CommonHeaderComponent,
        MeetingDetailEditComponent
    ]
})
export class ComponentsModule { }