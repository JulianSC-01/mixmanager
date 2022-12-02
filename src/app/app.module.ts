import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserModule, Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppSharedModule } from './modules/shared/app-shared.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppHomeComponent } from './components/app-home.component';
import { AppLoginComponent } from './components/app-login.component';
import { AppNavbarComponent } from './components/app-navbar.component';
import { AppNotFoundComponent } from './components/app-not-found.component';
import { AppStartupComponent } from './components/app-startup.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    AppLoginComponent,
    AppNavbarComponent,
    AppNotFoundComponent,
    AppStartupComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    ReactiveFormsModule,
    AppSharedModule,
    AppRoutingModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
