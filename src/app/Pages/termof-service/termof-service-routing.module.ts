import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermofServicePage } from './termof-service.page';

const routes: Routes = [
  {
    path: '',
    component: TermofServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermofServicePageRoutingModule {}
