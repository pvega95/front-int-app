import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ModelOneComponent } from './features/pdf-model/model-one/model-one.component';
import { ModelTwoComponent } from './features/pdf-model/model-two/model-two.component';
import { ModelThreeComponent } from './features/pdf-model/model-three/model-three.component';
import { NopagefoundComponent } from './features/nopagefound/nopagefound.component';


const routes: Routes = [
  { path: '', component: LoginComponent}, 
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'model-one', component: ModelOneComponent },
  { path: 'model-two', component: ModelTwoComponent },
  { path: 'model-three', component: ModelThreeComponent },
  {
    path: 'main', loadChildren: () => import('./shared/dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  // { path: '**', pathMatch: 'full', redirectTo: 'login'}
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
