import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { MantenimientoService } from '@core/services/mantenimientos/matenimientos.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tipo-empresa',
  templateUrl: './tipo-empresa.component.html',
  styleUrls: ['./tipo-empresa.component.scss']
})
export class TipoEmpresaComponent implements OnInit {

  constructor(
    
  ) { }

  ngOnInit() {
  }


}
