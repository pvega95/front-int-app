import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//SERVICIO PARA IMPORTAR SVG
import { SvgRegisterService } from './material/svg-register.service';

// import { AppErrorHandler } from './error-handler/app-error-handler.service';

/****** Interceptors ******/
// import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
// import { HeaderInterceptor } from './interceptors/header.interceptor';

/****** Servicios ******/
// Config
// import { LocalStorageService } from './local-storage/local-storage.service';
// import { EncrDecrService } from './services/encr-decr.service';
// import { HttpClienteService } from './services/http-cliente.service';
// import { AuthService } from './services/users/auth.service';
// Guard
// import { LoginGuard } from './guards/login.guard.service';
// import { ComponentGuard } from './guards/component.guard.service';
// Normales

const SERVICES = [
  SvgRegisterService
];

const COMPONENTS = [];

const INTERCEPTORS = [
  // { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    // angular
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ...SERVICES,
    ...INTERCEPTORS
    // { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
