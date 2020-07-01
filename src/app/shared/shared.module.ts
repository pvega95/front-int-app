import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData, DatePipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/****** Banderas Css ngx-flag-icon-css ******/
// Codigo ISO 2 (ISO 3166-1-alpha-2 code)
// https://www.npmjs.com/package/ngx-flag-icon-css
// https://github.com/lipis/flag-icon-css
// -> npm install ngx-flag-icon-css flag-icon-css
// <flag-icon country="pe" squared></flag-icon>
import { NgxFlagIconCssModule } from 'ngx-flag-icon-css'

/****** Material Angular ******/
import { MyMaterialModule } from '@shared/material/material.module';

import { LoadingfullComponent } from './loadingfull/loadingfull.component';


/****** Cloudinary ******/
// import {CloudinaryModule, CloudinaryConfiguration, provideCloudinary} from '@cloudinary/angular-4.x';
import { CloudinaryModule, CloudinaryConfiguration, provideCloudinary } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
// import { environment } from '@env/environment';
import { FileUploadModule } from 'ng2-file-upload';
import { DashboardComponent } from './dashboard/dashboard.component';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import localeEspE from '@angular/common/locales/es-PE';
import { environment } from '@env/environment';
import { ModalCartaComponent } from '../features/carta-fiscalizacion/modal-carta/modal-carta.component';
import { ModalGuiaComponent } from '../features/guia-remision/modal-guia/modal-guia.component';

//NG2-CHARTS
import { ChartsModule } from 'ng2-charts';
import { GraficaDonaComponent } from './grafica-dona/grafica-dona.component';

import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { GraficaBarraComponent } from './grafica-barra/grafica-barra.component';
import { AnalistaPipe } from '@core/pipe/analista.pipe';
import { DocumentoPipe } from '@core/pipe/documento.pipe';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};

registerLocaleData(localeEspE, 'es-PE');

const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  ScrollingModule,
  DragDropModule,
  MyMaterialModule,
  NgxFlagIconCssModule,
  CloudinaryModule,
  FileUploadModule,
  ChartsModule
];

const COMPONENTS = [
  LoadingfullComponent,
  ModalCartaComponent,
  ModalGuiaComponent,
  GraficaDonaComponent,
  GraficaBarraComponent,
  
];

const PIPES = [
  AnalistaPipe,
  DocumentoPipe
];

@NgModule({
  imports: [...MODULES,
    CloudinaryModule.forRoot(cloudinary, environment.cloudinarySettings as CloudinaryConfiguration)],
  exports: [...MODULES, ...COMPONENTS,...PIPES],
  providers: [
    // provideCloudinary(Cloudinary, environment.cloudinarySettings as CloudinaryConfiguration),
    { provide: LOCALE_ID, useValue: 'es-PE' },
    DatePipe
  ],
  declarations: [...COMPONENTS,...PIPES, GraficaBarraComponent]
})
export class SharedModule {}
