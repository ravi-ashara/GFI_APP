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
    loadChildren: () => import('./Pages/create-profile-intro/create-profile-intro.module').then( m => m.CreateProfileIntroPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./Pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./Pages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'create-profile',
    loadChildren: () => import('./Pages/create-profile/create-profile.module').then( m => m.CreateProfilePageModule)
  },
  {
    path: 'message-list',
    loadChildren: () => import('./Pages/message-list/message-list.module').then( m => m.MessageListPageModule)
  },
  {
    path: 'chat/:id',
    loadChildren: () => import('./Pages/chats/chats.module').then( m => m.ChatsPageModule)
  },
  {
    path: 'create-meeting',
    loadChildren: () => import('./Pages/create-meeting/create-meeting.module').then( m => m.CreateMeetingPageModule)
  },
  {
    path: 'sponsor',
    loadChildren: () => import('./Pages/sponsor/sponsor.module').then( m => m.SponsorPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
