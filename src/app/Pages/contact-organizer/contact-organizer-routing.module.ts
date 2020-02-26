import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactOrganizerPage } from './contact-organizer.page';

const routes: Routes = [
  {
    path: '',
    component: ContactOrganizerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactOrganizerPageRoutingModule {}
