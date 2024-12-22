import { Routes } from '@angular/router';
import { AppLoginGuard } from '../services/app-login-guard';
import { AppEditTrackComponent } from './components/app-edit-track.component';
import { AppEditTracklistComponent } from './components/app-edit-tracklist.component';
import { AppTracklistComponent } from './components/app-tracklist.component';

export const appTracklistRoutes: Routes = [
  { path : '',
    canActivate : [AppLoginGuard],
    component: AppTracklistComponent
  },
  { path : ':tracklistId',
    canActivate : [AppLoginGuard],
    component: AppEditTracklistComponent
  },
  { path : ':tracklistId/add',
    canActivate : [AppLoginGuard],
    component: AppEditTrackComponent
  },
  { path : ':tracklistId/:trackId',
    canActivate : [AppLoginGuard],
    component: AppEditTrackComponent
  }
];