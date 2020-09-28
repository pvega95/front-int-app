import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearEmpresaComponent } from './tipo-empresa/crear-editar/crear-editar.component';
import { ListarComponent } from './tipo-empresa/listar/listar.component';
import { TipoEmpresaComponent } from './tipo-empresa/tipo-empresa.component';

const routes: Routes = [
  { path: '', component: TipoEmpresaComponent },
  { path: 'tipo-empresa', component: TipoEmpresaComponent,
    children: [
      { path: '', component: ListarComponent},
      { path: 'crear', component: CrearEmpresaComponent },
    ]
  }
];

// const routes: Routes = [
//   { path: '', redirectTo: 'tipo-empresa' },
//   {
//     path: 'tipo-empresa', component: TipoEmpresaComponent,
//     children: [
//       { path: 'crear', component: CrearEmpresaComponent },
//     ]
//   },

// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
