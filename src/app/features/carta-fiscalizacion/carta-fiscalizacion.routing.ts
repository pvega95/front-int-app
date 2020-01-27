import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartaFiscalizacionComponent } from './carta-fiscalizacion.component';
import { AddComponent } from './add/add.component';


const routes: Routes = [
  { path: '', component: CartaFiscalizacionComponent },
  { path: 'create', component: AddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartaRoutingModule { }
