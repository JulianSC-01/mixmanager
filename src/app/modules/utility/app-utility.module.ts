import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSpinnerComponent } from './components/app-spinner.component';
import { AppAlertComponent } from './components/app-alert.component';
import { AppAddIconComponent } from './components/app-add-icon.component';
import { AppDeleteIconComponent } from './components/app-delete-icon.component';

@NgModule({
  declarations: [
    AppAlertComponent,
    AppSpinnerComponent,
    AppAddIconComponent,
    AppDeleteIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppAlertComponent,
    AppSpinnerComponent,
    AppAddIconComponent,
    AppDeleteIconComponent
  ]
})
export class AppUtilityModule { }
