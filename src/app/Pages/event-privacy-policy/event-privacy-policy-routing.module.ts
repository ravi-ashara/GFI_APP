import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventPrivacyPolicyPage } from './event-privacy-policy.page';

const routes: Routes = [
  {
    path: '',
    component: EventPrivacyPolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPrivacyPolicyPageRoutingModule {}
