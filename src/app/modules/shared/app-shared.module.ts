import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AlertComponent, FormErrorFeedbackComponent, FormErrorHeaderComponent, FormInputNumberComponent,
  FormInputSelectComponent, FormInputTextComponent, FormLabelComponent, PageFooterComponent,
  PageHeaderComponent, SpinnerComponent
} from 'js-shared';
import { AppAddIconComponent } from './components/app-add-icon.component';
import { AppDeleteIconComponent } from './components/app-delete-icon.component';
import { AppMusicIconComponent } from './components/app-music-icon.component';

@NgModule({
  declarations: [
    AppAddIconComponent,
    AppDeleteIconComponent,
    AppMusicIconComponent
  ],
  imports: [
    AlertComponent,
    CommonModule,
    FormErrorFeedbackComponent,
    FormErrorHeaderComponent,
    FormInputNumberComponent,
    FormInputSelectComponent,
    FormInputTextComponent,
    FormLabelComponent,
    PageFooterComponent,
    PageHeaderComponent,
    SpinnerComponent
  ],
  exports: [
    AlertComponent,
    AppAddIconComponent,
    AppDeleteIconComponent,
    AppMusicIconComponent,
    FormErrorFeedbackComponent,
    FormErrorHeaderComponent,
    FormInputNumberComponent,
    FormInputSelectComponent,
    FormInputTextComponent,
    FormLabelComponent,
    PageFooterComponent,
    PageHeaderComponent,
    SpinnerComponent
  ]
})
export class AppSharedModule { }