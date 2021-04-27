import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppTracklistRoutingModule } from './app-tracklist-routing.module';
import { AppSharedModule } from '../shared/app-shared.module';
import { AppTracklistComponent } from './components/app-tracklist.component';
import { AppEditTracklistComponent } from './components/app-edit-tracklist.component';
import { AppEditTrackComponent } from './components/app-edit-track.component';
import { AppTrackNumberPipe } from './pipes/app-track-number.pipe';
import { AppTracklistService } from './services/app-tracklist.service';
import { AppTrackService } from './services/app-track.service';

@NgModule({
  declarations: [
    AppTracklistComponent,
    AppEditTracklistComponent,
    AppEditTrackComponent,
    AppTrackNumberPipe
  ],
  imports: [
    AngularFirestoreModule,
    CommonModule,
    FormsModule,
    AppSharedModule,
    AppTracklistRoutingModule
  ],
  providers: [
    AppTracklistService,
    AppTrackService
  ]
})
export class AppTracklistModule { }
