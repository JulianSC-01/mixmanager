import { Routes } from '@angular/router';
import { AppHomeComponent } from './components/app-home.component';
import { AppLoginComponent } from './components/app-login.component';
import { AppNotFoundComponent } from './components/app-not-found.component';
import { AppStartupComponent } from './components/app-startup.component';
import { loginGuard } from './services/app-login-guard';

export const appRoutes: Routes = [
  { path: '',
    component: AppStartupComponent
  },
  { path: 'home',
    component: AppHomeComponent,
    canActivate: [loginGuard]
  },
  { path: 'login',
    component: AppLoginComponent,
  },
  { path: 'tracklists',
    canActivate: [loginGuard],
    loadChildren: () =>
      import ('./tracklist/app.tracklist.routes').
        then(m => m.appTracklistRoutes)
  },
  { path: 'notfound',
    component: AppNotFoundComponent
  },
  { path: '**',
    redirectTo: '/notfound'
  }
];