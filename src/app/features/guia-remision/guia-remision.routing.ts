import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuiaRemisionComponent } from './guia-remision.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  { path: '', component: GuiaRemisionComponent },
  { path: 'nueva-guia', component: AddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuiaRoutingModule { }
