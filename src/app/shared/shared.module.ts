import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
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
];

const COMPONENTS = [
  LoadingfullComponent,
  ModalCartaComponent
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS],
  providers: [
    provideCloudinary(Cloudinary, environment.cloudinarySettings as CloudinaryConfiguration),
    { provide: LOCALE_ID, useValue: 'es-PE' }
  ],
  declarations: [...COMPONENTS]
})
export class SharedModule {}
