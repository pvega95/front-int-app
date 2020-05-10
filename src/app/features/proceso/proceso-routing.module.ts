import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcesoComponent } from './proceso.component';
import { CreateProcessComponent } from './create/create-process/create-process.component';
import { EditProcessComponent } from './create/edit-process/edit-process.component';
import { GaleryComponent } from './create/galery/galery.component';

const routes: Routes = [
  { path: '', component: ProcesoComponent },
  { path: 'create', component: CreateProcessComponent },
  { path: 'edit', component: EditProcessComponent },
  { path: 'view', component: GaleryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesoRoutingModule { }
