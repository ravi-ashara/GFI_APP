import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConferenceBookPage } from './conference-book.page';

const routes: Routes = [
  {
    path: '',
    component: ConferenceBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConferenceBookPageRoutingModule {}
