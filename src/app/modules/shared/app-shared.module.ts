import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAddIconComponent } from './components/app-add-icon.component';
import { AppAlertComponent } from './components/app-alert.component';
import { AppDeleteIconComponent } from './components/app-delete-icon.component';
import { AppHeaderComponent } from './components/app-header.component';
import { AppMusicIconComponent } from './components/app-music-icon.component';
import { AppSpinnerComponent } from './components/app-spinner.component';

@NgModule({
  declarations: [
    AppAddIconComponent,
    AppAlertComponent,
    AppDeleteIconComponent,
    AppHeaderComponent,
    AppMusicIconComponent,
    AppSpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppAddIconComponent,
    AppAlertComponent,
    AppDeleteIconComponent,
    AppHeaderComponent,
    AppMusicIconComponent,
    AppSpinnerComponent
  ]
})
export class AppSharedModule { }