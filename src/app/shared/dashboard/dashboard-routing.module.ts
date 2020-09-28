import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

// Components
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    canActivate: [ AuthGuard ],
    children: [ 
      { path: '', redirectTo: 'proceso' },
      { path: 'proceso', loadChildren: () => import('../../features/proceso/proceso.module').then(m => m.ProcesoModule) },
      { path: 'carta-fiscalizacion', loadChildren: () => import('../../features/carta-fiscalizacion/carta-fiscalizacion.module').then(m => m.CartaFiscalizacionModule) },
      { path: 'hoja-envio', loadChildren: () => import('../../features/hoja-envio/hoja-envio.module').then(m => m.HojaEnvioModule) },
      { path: 'guia-remision', loadChildren: () => import('../../features/guia-remision/guia-remision.module').then(m => m.GuiaRemisionModule) },
      { path: 'mantenimiento', loadChildren: () => import('../../features/mantenimiento/mantenimiento.module').then(m => m.MantenimientoModule) },
      { path: 'reporte', loadChildren: () => import('../../features/reporte/reporte.module').then(m => m.ReporteModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
