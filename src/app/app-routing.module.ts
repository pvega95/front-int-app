import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent
  },
  { path: 'registro', component: RegisterComponent
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
