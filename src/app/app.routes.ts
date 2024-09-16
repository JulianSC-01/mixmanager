import { Routes } from '@angular/router';
import { AppHomeComponent } from './components/app-home.component';
import { AppLoginComponent } from './components/app-login.component';
import { AppNotFoundComponent } from './components/app-not-found.component';
import { AppStartupComponent } from './components/app-startup.component';
import { AppLoginGuard } from './services/app-login-guard';

export const appRoutes: Routes = [
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
    canActivate : [AppLoginGuard],
    loadComponent: () =>
      import('./tracklist/components/app-tracklist.component').
        then(c => c.AppTracklistComponent)
  },
  { path : 'tracklists/:tracklistId',
    canActivate : [AppLoginGuard],
    loadComponent: () =>
      import('./tracklist/components/app-edit-tracklist.component').
        then(c => c.AppEditTracklistComponent)
  },
  { path : 'tracklists/:tracklistId/add',
    canActivate : [AppLoginGuard],
    loadComponent: () =>
      import('./tracklist/components/app-edit-track.component').
        then(c => c.AppEditTrackComponent)
  },
  { path : 'tracklists/:tracklistId/:trackId',
    canActivate : [AppLoginGuard],
    loadComponent: () =>
      import('./tracklist/components/app-edit-track.component').
        then(c => c.AppEditTrackComponent)
  },
  { path : 'notfound',
    component : AppNotFoundComponent
  },
  { path : '**',
    redirectTo : '/notfound'
  }
];
