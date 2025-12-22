import { Routes } from '@angular/router';
import { loginGuard } from '../services/app-login-guard';
import { AppEditTrackComponent } from './components/app-edit-track.component';
import { AppEditTracklistComponent } from './components/app-edit-tracklist.component';
import { AppTracklistComponent } from './components/app-tracklist.component';

export const appTracklistRoutes: Routes = [
  { path: '',
    canActivate: [loginGuard],
    component: AppTracklistComponent
  },
  { path: ':tracklistId',
    canActivate: [loginGuard],
    component: AppEditTracklistComponent
  },
  { path: ':tracklistId/add',
    canActivate: [loginGuard],
    component: AppEditTrackComponent
  },
  { path: ':tracklistId/:trackId',
    canActivate: [loginGuard],
    component: AppEditTrackComponent
  }
];