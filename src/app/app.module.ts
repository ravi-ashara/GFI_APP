import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/** Services */
import { ApiCallService } from './Services/api-call/api-call.service';
import { AuthService } from './Services/auth/auth.service';
import { NetworkService } from './Services/network/network.service';

/** Components */
import { ComponentsModule } from './Components/components.module';
import { SettingMenuComponent } from './Components/setting-menu/setting-menu.component';
@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [
    SettingMenuComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiCallService,
    AuthService,
    NetworkService,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
