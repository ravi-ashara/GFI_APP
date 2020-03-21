import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SettingMenuComponent } from './setting-menu/setting-menu.component';
import { CommonHeaderComponent } from './common-header/common-header.component';

@NgModule({
    declarations: [
        SettingMenuComponent,
        CommonHeaderComponent
    ],
    imports: [CommonModule, IonicModule],
    exports: [
        SettingMenuComponent,
        CommonHeaderComponent
    ]
})
export class ComponentsModule { }