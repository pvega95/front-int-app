import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartaFiscalizacionComponent } from './carta-fiscalizacion.component';


const routes: Routes = [{ path: '', component: CartaFiscalizacionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartaRoutingModule { }
