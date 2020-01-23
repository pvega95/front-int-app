import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { HttpClienteService } from '../http-cliente.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {
  private url = environment.url_API
  
  constructor(
    public router: Router,
    private _http: HttpClienteService,
  ) { }

  setProcess(obj): Observable<any>  {
    console.log('obj',obj)
    const query = `${this.url}/api/process/create`;
    const data = obj
    return this._http.post(query, data);
  }

  getProcess(): Observable<any>{
    const query = `${this.url}/api/process/get-all`
    return this._http.get(query);
  }
  
  getPDF() {
    return this._http.getPDF(`${this.url}/api/process/get-pdf`)
      .pipe(map(data => { 
        console.log('databuffer',data)
        return new Blob([data], { type: 'application/pdf'  }) 
      }))
  }
}
