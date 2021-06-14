import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSpinnerComponent } from './components/app-spinner.component';
import { AppAlertComponent } from './components/app-alert.component';
import { AppAddIconComponent } from './components/app-add-icon.component';
import { AppDeleteIconComponent } from './components/app-delete-icon.component';
import { AppMusicIconComponent } from './components/app-music-icon.component';

@NgModule({
  declarations: [
    AppAlertComponent,
    AppSpinnerComponent,
    AppAddIconComponent,
    AppDeleteIconComponent,
    AppMusicIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppAlertComponent,
    AppSpinnerComponent,
    AppAddIconComponent,
    AppDeleteIconComponent,
    AppMusicIconComponent
  ]
})
export class AppSharedModule { }
