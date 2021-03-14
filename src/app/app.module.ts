import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';

import { AppUtilityModule } from './modules/utility/app-utility.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppFooterComponent } from './components/app-footer.component';
import { AppNavbarComponent } from './components/app-navbar.component';
import { AppHomeComponent } from './components/app-home.component';
import { AppNotFoundComponent } from './components/app-not-found.component';
import { AppStartupComponent } from './components/app-startup.component';

import { AppLoginService } from './services/app-login.service';
import { AppLoginGuard } from './services/app-login-guard';

@NgModule({
  declarations: [
    AppComponent,
    AppFooterComponent,
    AppHomeComponent,
    AppNavbarComponent,
    AppNotFoundComponent,
    AppStartupComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppUtilityModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AppLoginGuard,
    AppLoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
