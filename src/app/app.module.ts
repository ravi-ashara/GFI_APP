import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

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
import { CommonHeaderComponent } from './Components/common-header/common-header.component';
import { MeetingDetailEditComponent } from './Components/meeting-detail-edit/meeting-detail-edit.component';
import { CreateMeetingPageModule } from './Pages/create-meeting/create-meeting.module';
import { MeetingDetailsPageModule } from './Pages/meeting-details/meeting-details.module';
import { SponsorCompanyDetailsPageModule } from './Pages/sponsor-company-details/sponsor-company-details.module';

/** Plugin */
import { Push } from '@ionic-native/push/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { PipesModule } from './Pipes/pipes.module';
import { NgCalendarModule } from 'ionic2-calendar';
import { Base64 } from '@ionic-native/base64/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { FirebaseDBService } from './Services/firebase/firebase-db.service';
@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [
    CommonHeaderComponent,
    MeetingDetailEditComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    CreateMeetingPageModule,
    PipesModule,
    NgCalendarModule,
    MeetingDetailsPageModule,
    SponsorCompanyDetailsPageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiCallService,
    AuthService,
    NetworkService,
    FirebaseDBService,
    Network,
    Push,
    Camera,
    Base64,
    Crop,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
