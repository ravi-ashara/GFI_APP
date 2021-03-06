import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './Services/auth/auth.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./Pages/tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthService]
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'create-profile-intro',
    loadChildren: () => import('./Pages/create-profile-intro/create-profile-intro.module').then(m => m.CreateProfileIntroPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./Pages/settings/settings.module').then(m => m.SettingsPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'notification',
    loadChildren: () => import('./Pages/notification/notification.module').then(m => m.NotificationPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'create-profile',
    loadChildren: () => import('./Pages/create-profile/create-profile.module').then(m => m.CreateProfilePageModule)
  },
  {
    path: 'message-list',
    loadChildren: () => import('./Pages/message-list/message-list.module').then(m => m.MessageListPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'chat',
    loadChildren: () => import('./Pages/chats/chats.module').then(m => m.ChatsPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'sponsor',
    loadChildren: () => import('./Pages/sponsor/sponsor.module').then(m => m.SponsorPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'contact-organizer',
    loadChildren: () => import('./Pages/contact-organizer/contact-organizer.module').then(m => m.ContactOrganizerPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'conference-guide',
    loadChildren: () => import('./Pages/conference-book/conference-book.module').then(m => m.ConferenceBookPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./Pages/my-profile/my-profile.module').then(m => m.MyProfilePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./Pages/about-page/about-page.module').then(m => m.AboutPagePageModule)
  },
  {
    path: 'acknowledgement',
    loadChildren: () => import('./Pages/acknowledgement/acknowledgement.module').then(m => m.AcknowledgementPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'term-of-service',
    loadChildren: () => import('./Pages/termof-service/termof-service.module').then(m => m.TermofServicePageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./Pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'event-privacy-policy',
    loadChildren: () => import('./Pages/event-privacy-policy/event-privacy-policy.module').then(m => m.EventPrivacyPolicyPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./Pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'set-password',
    loadChildren: () => import('./Pages/set-password/set-password.module').then( m => m.SetPasswordPageModule)
  },
  {
    path: 'sponsor-company-details',
    loadChildren: () => import('./Pages/sponsor-company-details/sponsor-company-details.module').then( m => m.SponsorCompanyDetailsPageModule),
    canActivate: [AuthService]
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
