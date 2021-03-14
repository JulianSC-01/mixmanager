import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppHomeComponent } from './components/app-home.component';
import { AppNotFoundComponent } from './components/app-not-found.component';
import { AppStartupComponent } from './components/app-startup.component';

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
    loadChildren: () => 
      import('./modules/login/app-login.module').then(
        m => m.AppLoginModule)
  }, 
  { path : 'tracklists', 
    loadChildren: () => 
      import('./modules/tracklist/app-tracklist.module').then(
        m => m.AppTracklistModule),
    canLoad : [AppLoginGuard] 
  },
  { path : 'notfound', 
    component : AppNotFoundComponent 
  },
  { path : '**', 
    redirectTo : '/notfound' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
