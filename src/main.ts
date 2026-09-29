import { bootstrapApplication } from '@angular/platform-browser';
import { initializeApp } from 'firebase/app';
import 'temporal-spec/global';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

export const FIREBASE_APP =
  initializeApp(environment.firebaseConfig);

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
