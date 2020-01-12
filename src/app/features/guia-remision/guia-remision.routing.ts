import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuiaRemisionComponent } from './guia-remision.component';

const routes: Routes = [{ path: '', component: GuiaRemisionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuiaRoutingModule { }
