import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ModelOneComponent } from './features/pdf-model/model-one/model-one.component';
import { ModelTwoComponent } from './features/pdf-model/model-two/model-two.component';
import { ModelThreeComponent } from './features/pdf-model/model-three/model-three.component';
import { ModalsModule } from '@shared/modals/modals.module';
import { NopagefoundComponent } from './features/nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ModelOneComponent,
    ModelTwoComponent,
    ModelThreeComponent,
    NopagefoundComponent,
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
