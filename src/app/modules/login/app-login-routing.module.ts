import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLoginComponent } from './components/app-login.component';

const routes: Routes = [
  { path : '', 
    component : AppLoginComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLoginRoutingModule { }
