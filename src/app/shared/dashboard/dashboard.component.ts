import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '@core/services/resources/dashboard.service';
import { AuthService } from '@core/services/auth/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { animate, AUTO_STYLE, style, transition, trigger } from '@angular/animations';

const MENU = [
  {
    title: "OPCIONES",
    titlesm: "OPC",
    children:[
      { name: "Proceso" , router: "proceso", namesm: "Pr"},
      { name: "Carta Fiscalizacion", router: "carta-fiscalizacion", namesm: "Cf" },
      { name: "Hoja de Envio", router: "hoja-envio", namesm: "He" },
      { name: "Guia remision", router: "guia-remision", namesm: "Gr" },
      { name: "Reportes", router: "reporte", namesm: "Re" },
    ]
  },
  {
    title: "MANTENIMIENTO",
    titlesm: "MNT",
    children:[
      { name: "Analista", router: "analista", namesm: "An" },
      { name: "Tipo Procedimiento", router: "tipo-procedimiento", namesm: "Tp" },

    ]
  }
]
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0, overflow : 'hidden' }),
            animate('1s ease-out', 
                    style({ height: AUTO_STYLE }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: AUTO_STYLE, overflow : 'hidden' }),
            animate('1s ease-in', 
                    style({ height: 0 }))
          ]
        )
      ]
    )
  ]
})
export class DashboardComponent implements OnInit,OnDestroy {
  menus: Array<any>
  collapseMenu: boolean;
  collapsedNav: boolean;
  mobileQuery: MediaQueryList;
  visibleIndex = -1;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.menus = MENU
  }

  showSubItem(ind) {
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

}
