import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { LoadingfullComponent } from './shared/loadingfull/loadingfull.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { LoginComponent } from './features/login/login.component';
import { ProcesoComponent } from './features/proceso/proceso.component';
import { CartaFiscalizacionComponent } from './features/carta-fiscalizacion/carta-fiscalizacion.component';
import { HojaEnvioComponent } from './features/hoja-envio/hoja-envio.component';
import { GuiaRemisionComponent } from './features/guia-remision/guia-remision.component';
import { ReporteComponent } from './features/reporte/reporte.component';
import { RegisterComponent } from './features/register/register.component';
import { ModelOneComponent } from './features/pdf-model/model-one/model-one.component';
import { ModelTwoComponent } from './features/pdf-model/model-two/model-two.component';
import { ModelThreeComponent } from './features/pdf-model/model-three/model-three.component';
import { ModalsModule } from '@shared/modals/modals.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ModelOneComponent,
    ModelTwoComponent,
    ModelThreeComponent,
    // DashboardComponent,
    // LoadingfullComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //CORE MODULE Y SHARED
    CoreModule,
    SharedModule,
    ModalsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
