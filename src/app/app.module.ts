import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';
/** Services */
import { ApiCallService } from './Services/api-call/api-call.service';
import { AuthService } from './Services/auth/auth.service';
import { NetworkService } from './Services/network/network.service';

/** Components */
import { ComponentsModule } from './Components/components.module';
import { CommonHeaderComponent } from './Components/common-header/common-header.component';
import { CreateMeetingPageModule } from './Pages/create-meeting/create-meeting.module';
import { BookMeetingPageModule } from './Pages/book-meeting/book-meeting.module';

/** Plugin */
import { Push } from '@ionic-native/push/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { PipesModule } from './Pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [
    CommonHeaderComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    CreateMeetingPageModule,
    BookMeetingPageModule,
    PipesModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiCallService,
    AuthService,
    NetworkService,
    Network,
    Push,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
