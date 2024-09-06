import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent, FormErrorFeedbackComponent, FormErrorHeaderComponent, FormInputNumberComponent, FormInputSelectComponent, FormInputTextComponent, FormLabelComponent, PageHeaderComponent, SpinnerComponent } from 'js-shared';
import { AppAddIconComponent } from '../shared/components/app-add-icon.component';
import { AppDeleteIconComponent } from '../shared/components/app-delete-icon.component';
import { AppTracklistRoutingModule } from './app-tracklist-routing.module';
import { AppEditTrackComponent } from './components/app-edit-track.component';
import { AppEditTracklistComponent } from './components/app-edit-tracklist.component';
import { AppTracklistComponent } from './components/app-tracklist.component';
import { AppTrackLengthAccessiblePipe } from './pipes/app-track-length-accessible.pipe';
import { AppTrackLengthPipe } from './pipes/app-track-length.pipe';
import { AppTrackNumberPipe } from './pipes/app-track-number.pipe';
import { AppTrackService } from './services/app-track.service';
import { AppTracklistService } from './services/app-tracklist.service';

@NgModule({
  declarations: [
    AppTracklistComponent,
    AppEditTracklistComponent,
    AppEditTrackComponent,
    AppTrackLengthAccessiblePipe,
    AppTrackLengthPipe,
    AppTrackNumberPipe
  ],
  imports: [
    // js-shared
    AlertComponent,
    FormErrorFeedbackComponent,
    FormErrorHeaderComponent,
    FormInputNumberComponent,
    FormInputSelectComponent,
    FormInputTextComponent,
    FormLabelComponent,
    PageHeaderComponent,
    SpinnerComponent,
    // MixManager
    AppAddIconComponent,
    AppDeleteIconComponent,
    AngularFirestoreModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppTracklistRoutingModule
  ],
  providers: [
    AppTracklistService,
    AppTrackService
  ]
})
export class AppTracklistModule { }
