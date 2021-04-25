import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { AppHomeComponent } from './components/app-home.component';
import { AppNotFoundComponent } from './components/app-not-found.component';
import { AppStartupComponent } from './components/app-startup.component';
import { AppLoginComponent } from './components/app-login.component';
import { AppLoginGuard } from './services/app-login-guard';

const routes: Routes = [
  { path : '', 
    component : AppStartupComponent 
  }, 
  { path : 'home',
    component : AppHomeComponent,
    canActivate : [AppLoginGuard] 
  },
  { path : 'login', 
    component : AppLoginComponent,
  }, 
  { path : 'tracklists', 
    loadChildren: () => 
      import('./modules/tracklist/app-tracklist.module').then(
        m => m.AppTracklistModule)
  },
  { path : 'notfound', 
    component : AppNotFoundComponent 
  },
  { path : '**', 
    redirectTo : '/notfound' 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
