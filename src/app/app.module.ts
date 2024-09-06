import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AlertComponent, FormErrorHeaderComponent, FormInputTextComponent, PageFooterComponent, PageHeaderComponent, SpinnerComponent } from 'js-shared';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHomeComponent } from './components/app-home.component';
import { AppLoginComponent } from './components/app-login.component';
import { AppNavbarComponent } from './components/app-navbar.component';
import { AppNotFoundComponent } from './components/app-not-found.component';
import { AppStartupComponent } from './components/app-startup.component';
import { AppMusicIconComponent } from './modules/shared/components/app-music-icon.component';

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
    // js-shared
    AlertComponent,
    FormErrorHeaderComponent,
    FormInputTextComponent,
    PageFooterComponent,
    PageHeaderComponent,
    SpinnerComponent,
    // MixManager
    AppMusicIconComponent,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
