import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAddIconComponent } from './components/app-add-icon.component';
import { AppDeleteIconComponent } from './components/app-delete-icon.component';
import { AppMusicIconComponent } from './components/app-music-icon.component';
import { SharedModule } from 'js-shared';

@NgModule({
  declarations: [
    AppAddIconComponent,
    AppDeleteIconComponent,
    AppMusicIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppAddIconComponent,
    AppDeleteIconComponent,
    AppMusicIconComponent,
    SharedModule
  ]
})
export class AppSharedModule { }