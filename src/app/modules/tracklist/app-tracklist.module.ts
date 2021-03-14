import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppTracklistRoutingModule } from './app-tracklist-routing.module';
import { AppUtilityModule } from '../utility/app-utility.module';

import { AppTracklistService } from './services/app-tracklist.service';

import { AppTracklistComponent } from './components/app-tracklist.component';
import { AppEditTracklistComponent } from './components/app-edit-tracklist.component';
import { AppEditTrackComponent } from './components/app-edit-track.component';
import { AppTrackNumberPipe } from './pipes/app-track-number.pipe';

@NgModule({
  declarations: [
    AppTracklistComponent,
    AppEditTracklistComponent,
    AppEditTrackComponent,
    AppTrackNumberPipe
  ],
  imports: [
    AngularFirestoreModule,
    AppUtilityModule,
    CommonModule,
    FormsModule,
    AppTracklistRoutingModule
  ],
  providers: [
    AppTracklistService
  ]
})
export class AppTracklistModule { }
