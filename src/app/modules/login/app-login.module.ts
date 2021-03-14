import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppLoginRoutingModule } from './app-login-routing.module';
import { AppLoginComponent } from './components/app-login.component';
import { AppUtilityModule } from '../utility/app-utility.module';

@NgModule({
  declarations: [
    AppLoginComponent
  ],
  imports: [
    AppUtilityModule,
    CommonModule,
    ReactiveFormsModule,
    AppLoginRoutingModule
  ]
})
export class AppLoginModule { }
