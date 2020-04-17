import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartaFiscalizacionComponent } from './carta-fiscalizacion.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  { path: '', component: CartaFiscalizacionComponent },
  { path: 'create', component: AddComponent },
  { path: 'edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartaRoutingModule { }
