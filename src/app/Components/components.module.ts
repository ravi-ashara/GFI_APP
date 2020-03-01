import { SettingMenuComponent } from './setting-menu/setting-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [SettingMenuComponent],
    imports: [CommonModule, IonicModule],
    exports: [SettingMenuComponent]
})
export class ComponentsModule { }