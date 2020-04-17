import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ModelOneComponent } from './features/pdf-model/model-one/model-one.component';
import { ModelTwoComponent } from './features/pdf-model/model-two/model-two.component';
import { ModelThreeComponent } from './features/pdf-model/model-three/model-three.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'model-one', component: ModelOneComponent },
  { path: 'model-two', component: ModelTwoComponent },
  { path: 'model-three', component: ModelThreeComponent },
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
