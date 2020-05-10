import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SvgRegisterService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }
  init(){
    this.matIconRegistry
      .addSvgIcon(
        'icon-fbx-mailinput',
        this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/correoregistro.svg')
      )
      .addSvgIcon(
        'icon-fbx-arrow',
        this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/arrow.svg')
      )
      .addSvgIcon(
        'icon-fbx-arrow-p',
        this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/arrow_p.svg')
      )
  }

}
