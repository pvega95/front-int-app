import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'proceso', loadChildren: () => import('../../features/proceso/proceso.module').then(m => m.ProcesoModule) },
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: '/main/proceso' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
