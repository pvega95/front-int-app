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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // DashboardComponent,
    // LoadingfullComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //CORE MODULE Y SHARED
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
