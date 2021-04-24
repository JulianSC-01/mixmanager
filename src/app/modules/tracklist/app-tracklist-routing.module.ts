import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppTracklistComponent } from './components/app-tracklist.component';
import { AppLoginGuard } from 'src/app/services/app-login-guard';
import { AppEditTracklistComponent } from './components/app-edit-tracklist.component';
import { AppEditTrackComponent } from './components/app-edit-track.component';

const routes: Routes = [
  { path : '', 
    component : AppTracklistComponent,
    canActivate : [AppLoginGuard] 
  },
  { path : ':tracklistId', 
    component : AppEditTracklistComponent,
    canActivate : [AppLoginGuard] 
  },
  { path : ':tracklistId/add', 
    component : AppEditTrackComponent,
    canActivate : [AppLoginGuard] 
  },
  { path : ':tracklistId/:trackId', 
    component : AppEditTrackComponent,
    canActivate : [AppLoginGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppTracklistRoutingModule { }
