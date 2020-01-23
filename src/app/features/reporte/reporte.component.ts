import { Component, OnInit } from '@angular/core';
import { GenerateService } from '@core/services/generate-pdf/generate.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  constructor(
    private _generate : GenerateService,
    private http : HttpClient
  ) { }

  ngOnInit() {
  }
  generatePDF(){
    console.log('generate pdf running')
    this._generate.getPDF().pipe(take(1))
      .subscribe(
        val =>{
          console.log('val',val)
          var fileURL = URL.createObjectURL(val);
          window.open(fileURL)
          
        },
        (err : HttpErrorResponse)=>{
          console.log('err',err)
        }
      )
  }
}
