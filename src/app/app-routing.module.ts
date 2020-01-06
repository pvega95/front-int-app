import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent
  },
  {
    path: 'main', loadChildren: () => import('./shared/dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
