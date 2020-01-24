import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClienteService } from '../http-cliente.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenerateService {
  private url = environment.url_API
  constructor(
    public router: Router,
    private _http: HttpClienteService,
    private http : HttpClient
  ) { }
  
  // getPDF(): Observable<any>{
  //   const query = `${this.url}/api/generate/get-pdf`
  //   return this._http.get(query);
  // }

  getPDF() {
    return this._http.getPDF(`${this.url}/api/generate/get-pdf`)
      .pipe(map(data => { 
        console.log('databuffer',data)
        return new Blob([data], { type: 'application/pdf'  })
      }))
  }

}
